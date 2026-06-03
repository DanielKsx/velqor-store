import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }


  async findAll() {
    return this.prisma.product.findMany({
      include: {
        images: true,
        variants: true,
      }
    });
  }

  async findBySku(sku: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        sku,
      },
      include: {
        images: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product;
  }




}
