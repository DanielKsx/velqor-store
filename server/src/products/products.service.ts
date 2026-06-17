import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const productInclude = {
  images: {
    orderBy: {
      order: 'asc',
    },
  },
  variants: true,
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }


  async findAll() {
    return this.prisma.product.findMany({
      include: productInclude,
    });
  }

  async findBySku(sku: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        sku,
      },
      include: productInclude,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: productInclude,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { images, variants, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
      },
      include: productInclude,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findById(id);

    const { images, variants, ...productData } = updateProductDto;

    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: productData,
      });

      if (images) {
        await tx.productImage.deleteMany({
          where: { productId: id },
        });

        await tx.productImage.createMany({
          data: images.map((image) => ({
            ...image,
            productId: id,
          })),
        });
      }

      if (variants) {
        await tx.productVariant.deleteMany({
          where: { productId: id },
        });

        await tx.productVariant.createMany({
          data: variants.map((variant) => ({
            ...variant,
            productId: id,
          })),
        });
      }

      return tx.product.findUnique({
        where: { id },
        include: productInclude,
      });
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      await tx.productVariant.deleteMany({
        where: {
          productId: id,
        },
      });

      return tx.product.delete({
        where: {
          id,
        },
      });
    });
  }


}
