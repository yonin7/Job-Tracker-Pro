// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // נצטרך מודול משתמשים
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy'; // אסטרטגיית JWT

@Module({
  imports: [
    UsersModule, // מודול המשתמשים יספק את UsersService
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // קחו את הסוד מתוך משתני הסביבה
        signOptions: { expiresIn: '60m' }, // זמן תפוגה של הטוקן
      }),
      inject: [ConfigService],
    }),
    ConfigModule, // ודא ש-ConfigModule מיובא כדי לקבל גישה למשתני הסביבה
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // חשוב לייצא את AuthService אם מודולים אחרים יצטרכו אותו
})
export class AuthModule {}
