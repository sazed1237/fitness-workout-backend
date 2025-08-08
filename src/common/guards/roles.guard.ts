import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the role metadata from the route handler
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    
    if (!requiredRole) return true;  // No role required, allow access
    
    const request = context.switchToHttp().getRequest();
    const user = request.user; // The user data is added by the JWT strategy (through the JwtAuthGuard)
    
    if (!user) return false; // If no user, deny access

    // Check if the user has the required role
    return user.role === requiredRole;
  }
}
