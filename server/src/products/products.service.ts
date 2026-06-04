import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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




}
