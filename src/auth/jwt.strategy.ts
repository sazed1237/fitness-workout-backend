import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Ensure this matches the JWT_SECRET from your .env
    });
  }

  async validate(payload: any) {
    // Return user data after JWT validation
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
