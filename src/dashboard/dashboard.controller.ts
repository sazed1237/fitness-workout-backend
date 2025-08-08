import { Controller, Get, Query, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Role } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { GetVideosDto } from './dto/get-videos.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Role('ADMIN')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Get all users with pagination and filtering
  @Get('users')
  async getUsers(@Query() dto: GetUsersDto) {
    return this.dashboardService.getUsers(dto);
  }

  // Get all videos with pagination
  @Get('videos')
  async getVideos(@Query() dto: GetVideosDto) {
    return this.dashboardService.getVideos(dto);
  }

  // Get total revenue from active subscriptions
  @Get('revenue')
  async getRevenue() {
    return this.dashboardService.getTotalRevenue();
  }

  // Delete a user by ID
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.dashboardService.deleteUser(id);
  }
}
