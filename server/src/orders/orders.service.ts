import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';


type ProductWithVariants = Prisma.ProductGetPayload<{
    include: {
        variants: true;
    };
}>;

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    private getUniqueProductIds(createOrderDto: CreateOrderDto) {
        return [
            ...new Set(createOrderDto.items.map((item) => item.productId)),
        ];
    }

    private async getProductsWithVariants(productIds: string[]) {
        return this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            include: {
                variants: true,
            },
        });
    }

    private validateOrderItems(createOrderDto: CreateOrderDto, productsMap: Map<string, ProductWithVariants>) {
        for (const item of createOrderDto.items) {
            const product = productsMap.get(item.productId);

            const variant = product?.variants.find(
                (variant) =>
                    variant.color === item.color &&
                    variant.size === item.size,
            );

            if (!variant) {
                throw new NotFoundException('Product variant not found');
            }

            if (variant.stock < item.quantity) {
                throw new BadRequestException('Not enough stock');
            }
        }
    }

    private validateProductsExist(products: ProductWithVariants[], productIds: string[]) {
        if (products.length !== productIds.length) {
            throw new NotFoundException('One or more products not found');
        }
    }

    private calculateTotalPrice(createOrderDto: CreateOrderDto, productsMap: Map<string, ProductWithVariants>) {
        const totalPrice = createOrderDto.items.reduce(
            (sum, item) => {
                const product = productsMap.get(item.productId);

                if (!product) {
                    throw new NotFoundException('Product not found');
                }
                return sum + Number(product.price) * item.quantity;
            }, 0);
        return Number(totalPrice.toFixed(2));
    }

    private createOrderItemData(createOrderDto: CreateOrderDto, orderId: string, productsMap: Map<string, ProductWithVariants>) {
        return createOrderDto.items.map((item) => {
            const product = productsMap.get(item.productId);

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            const itemTotalPrice = Number(
                (Number(product.price) * item.quantity).toFixed(2),
            );

            return {
                orderId,
                productIdSnapshot: product.id,
                productNameSnapshot: product.name,
                productColorSnapshot: item.color,
                productSizeSnapshot: item.size,
                productPriceSnapshot: product.price,
                quantity: item.quantity,
                note: item.note,
                totalPrice: itemTotalPrice,
            };
        });
    }

    async create(createOrderDto: CreateOrderDto) {
        const productIds = this.getUniqueProductIds(createOrderDto);
        const products = await this.getProductsWithVariants(productIds);
        const productsMap = new Map(products.map((product) => [product.id, product]));

        this.validateProductsExist(products, productIds);
        this.validateOrderItems(createOrderDto, productsMap);

        const finalTotalPrice = this.calculateTotalPrice(createOrderDto, productsMap);

        return this.prisma.$transaction(async (transaction) => {
            const order = await transaction.order.create({
                data: {
                    customerName: createOrderDto.customerName,
                    customerEmail: createOrderDto.customerEmail,
                    customerPhone: createOrderDto.customerPhone,
                    customerAddress: createOrderDto.customerAddress,
                    totalPrice: finalTotalPrice,
                },
            });
            const orderItemData = this.createOrderItemData(createOrderDto, order.id, productsMap)

            await transaction.orderItem.createMany({
                data: orderItemData,
            });

            return order;
        });
    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    async updateStatus(
        id: string,
        updateOrderStatusDto: UpdateOrderStatusDto,
    ) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return this.prisma.order.update({
            where: {
                id,
            },
            data: {
                status: updateOrderStatusDto.status,
            },
            include: {
                items: true,
            },
        });
    }
}
