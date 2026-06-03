import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createOrderDto: CreateOrderDto) {
        const productIds = [
            ...new Set(createOrderDto.items.map((item) => item.productId)),
        ];

        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        const productsMap = new Map(products.map((product) => [product.id, product]));

        if (products.length !== productIds.length) {
            throw new NotFoundException('One or more products not found');
        }

        const totalPrice = createOrderDto.items.reduce(
            (sum, item) => {
                const product = productsMap.get(item.productId);

                if (!product) {
                    return sum;
                }
                return sum + Number(product.price) * item.quantity;
            },
            0,
        );
        const finalTotalPrice = Number(totalPrice.toFixed(2));

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

            const orderItemData = createOrderDto.items.map((item) => {
                const product = productsMap.get(item.productId);

                if (!product) {
                    throw new NotFoundException('Product not found');
                }

                const itemTotalPrice = Number(
                    (Number(product.price) * item.quantity).toFixed(2),
                );

                return {
                    orderId: order.id,
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
                createdAt: 'desc'
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
            throw new NotFoundException('Order not found')
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
        });
    }
}
