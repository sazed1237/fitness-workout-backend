import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { addMinutes, isBefore } from 'date-fns';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { generateOtp } from './utils/otp-generator';
import { AssignRoleDto } from './dto/assign-role-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
      },
    });

    return { message: 'User registered successfully', user };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const otp = generateOtp();
    const expires = addMinutes(new Date(), 10);

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        otp,
        otpExpiresAt: expires,
      },
    });

    // 👉 send email logic (log for now)
    console.log(`Sending OTP to ${dto.email}: ${otp}`);

    return { message: 'OTP sent to your email (mock)' };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (
      !user ||
      user.otp !== dto.otp ||
      !user.otpExpiresAt ||
      isBefore(user.otpExpiresAt, new Date())
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    return { message: 'OTP verified successfully' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (
      !user ||
      user.otp !== dto.otp ||
      !user.otpExpiresAt ||
      isBefore(user.otpExpiresAt, new Date())
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        password: hashed,
        otp: null,
        otpExpiresAt: null,
      },
    });

    return { message: 'Password reset successful' };
  }

  async assignRole(requesterId: string, dto: AssignRoleDto) {
    const requester = await this.prisma.user.findUnique({
      where: { id: requesterId },
    });

    if (!requester || requester.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can assign roles');
    }

    const targetUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!targetUser) {
      throw new NotFoundException('Target user not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { email: dto.email },
      data: { role: dto.role },
    });

    return {
      message: `Role updated to ${dto.role} for ${dto.email}`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    };
  }
}
