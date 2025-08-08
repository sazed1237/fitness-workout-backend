import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // Admin assigns subscription to a user
  @Post('assign')
  @UseGuards(RolesGuard)
  @Role('ADMIN')
  create(@Req() req) {
    return this.subscriptionsService.createSubscription(req.user.userId);
  }
}
