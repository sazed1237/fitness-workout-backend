import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Role } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Admin only: Create a product
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  create(@Body() dto: CreateProductDto, @Req() req) {
    return this.productsService.createProduct(dto);
  }

  // Admin only: Update a product
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  // Admin only: Delete a product
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  delete(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  // Public: Get products with filters (name, price, stock)
  @Get()
  getAll(@Query() filters: SearchProductsDto) {
    return this.productsService.getAllProducts(filters);
  }
}
