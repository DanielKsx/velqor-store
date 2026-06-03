import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
