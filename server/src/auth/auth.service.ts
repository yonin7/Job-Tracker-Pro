// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { AuthUser } from './interfaces/auth-user.interface'; // ייבוא ה-Interface החדש

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // שנה את החתימה כאן מ-any ל-AuthUser | null
  async validateUser(email: string, pass: string): Promise<AuthUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // ודא שהאובייקט שמוחזר תואם ל-AuthUser
      return { id: user.id, email: user.email };
    }
    return null;
  }

  // ה-login service עדיין יכול לקבל any אם זה רק הפיילוד של ה-JWT
  async login(user: AuthUser) {
    // שינוי כאן ל-AuthUser כדי לוודא שאתה משתמש בטיפוס הנכון
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(email, hashedPassword);

    // זה החלק שאתה רוצה לשנות:
    // במקום להחזיר את newUser ישירות (שמכיל את הסיסמה המקודדת),
    // נחזיר אובייקט נקי יותר:
    const { password: userPassword, ...result } = newUser; // נשלוף את שדה הסיסמה
    return result as User; // נחזיר את שאר האובייקט
  }
}
