import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class VideosService {
  constructor(
    private prisma: PrismaService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  // Upload video (only accessible by admin)
  async uploadVideo(userId: string, dto: CreateVideoDto) {
    const video = await this.prisma.video.create({
      data: {
        ...dto,
        createdBy: userId,
      },
    });

    return video;
  }

  // Get all videos (only accessible by users with an active subscription)
  async getAllVideos(userId: string) {
    await this.subscriptionsService.checkSubscription(userId);  // Check if the user has an active subscription

    return this.prisma.video.findMany();
  }
}
