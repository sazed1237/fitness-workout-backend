import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create a product
  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: dto,
    });
  }

  // Update a product
  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a product
  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Get all products with filters (for public users)
  async getAllProducts(filters: SearchProductsDto) {
    try {
      const { name, minPrice, maxPrice, stock } = filters;

      // Only add minPrice and maxPrice if they are valid numbers
      const where: any = {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        price: {},
        stock: stock || undefined,
      };

      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;

      return await this.prisma.product.findMany({
        where: where,
      });
    } catch (error) {
      console.error('Error fetching products:', error); // Log the error for debugging
      throw new Error('An error occurred while fetching products');
    }
  }
}
