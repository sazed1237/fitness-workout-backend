import { IsNumber, IsOptional } from 'class-validator';

export class GetVideosDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
