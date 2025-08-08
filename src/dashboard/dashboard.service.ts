import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetUsersDto } from './dto/get-users.dto';
import { GetVideosDto } from './dto/get-videos.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  // Get paginated users (with filters like email)
  async getUsers(dto: GetUsersDto) {
    const { email, page = 1, limit = 10 } = dto;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    const users = await this.prisma.user.findMany({
      where: {
        email: email ? { contains: email, mode: 'insensitive' } : undefined,
      },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    console.log(users);

    return users;
  }

  // Get paginated videos
  async getVideos(dto: GetVideosDto) {
    const { page = 1, limit = 10 } = dto;

    const videos = await this.prisma.video.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return videos;
  }

  // Get total revenue (number of active subscriptions)
  async getTotalRevenue() {
    const subscriptions = await this.prisma.subscription.findMany({
      where: { isActive: true },
    });

    console.log(subscriptions);

    const revenue = subscriptions.reduce((total, sub) => {
      return total + sub?.price;
    }, 0);

    return { totalRevenue: revenue };
  }
  
  // Delete a user by ID
  async deleteUser(userId: string) {
    return await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
