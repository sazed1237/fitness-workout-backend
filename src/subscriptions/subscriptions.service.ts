import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  // Create a subscription (admin assigns or mock subscription for users)
  async createSubscription(userId: string) {
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1); // 1-month subscription

    return this.prisma.subscription.upsert({
      where: { userId },
      update: { isActive: true, currentPeriodEnd },
      create: { userId, isActive: true, currentPeriodEnd },
    });
  }

  // Check if a user has an active subscription
  async checkSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription || !subscription.isActive || subscription.currentPeriodEnd < new Date()) {
      throw new ForbiddenException('Subscription required to access videos');
    }

    return true;
  }
}
