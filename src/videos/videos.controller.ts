import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';

@Controller('videos')
@UseGuards(JwtAuthGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Admin can upload videos
  @Post()
  @UseGuards(RolesGuard)
  @Role('ADMIN')
  upload(@Body() dto: CreateVideoDto, @Req() req) {
    return this.videosService.uploadVideo(req.user.userId, dto);
  }

  // Users can get all videos if they have an active subscription
  @Get()
  getAll(@Req() req) {
    return this.videosService.getAllVideos(req.user.userId);
  }
}
