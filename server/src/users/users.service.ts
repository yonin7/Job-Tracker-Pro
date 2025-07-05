// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    // שנה ל-User | null
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    // שנה ל-User | null
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ email, password });
    return this.usersRepository.save(newUser);
  }
}
