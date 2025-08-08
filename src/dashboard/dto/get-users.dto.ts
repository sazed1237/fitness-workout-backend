import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
