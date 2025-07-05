// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'; // וודא ש-UnauthorizedException מיובא אם משתמשים בו
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      // זו בדיקה בסיסית, ב-prod תרצה לטפל בזה בצורה יותר אלגנטית
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // ודא שזה לא undefined כאן!
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
