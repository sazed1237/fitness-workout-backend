import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchProductsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;
}
