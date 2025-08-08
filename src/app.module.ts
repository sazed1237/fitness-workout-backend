import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, VideosModule, SubscriptionsModule, ProductsModule, DashboardModule],
})
export class AppModule {}
