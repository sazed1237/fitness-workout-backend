import { IsNumber, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoUrl: string; // URL for the workout video (e.g., hosted on S3 or Vimeo)
}
