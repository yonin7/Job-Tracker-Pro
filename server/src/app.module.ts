// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ייבוא ConfigModule
import { AuthModule } from './auth/auth.module'; // ייבוא מודול האותנטיקציה
import { UsersModule } from './users/users.module'; // ייבוא מודול המשתמשים
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/entities/user.entity'; // הוסף שורה זו!
// src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // הופך את ConfigModule לגלובלי
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_NAME', 'db.sqlite'), // שם קובץ ה-DB
        entities: [Job, User], // חשוב להוסיף את User entity!
        synchronize: true, // ב-dev, יוצר טבלאות אוטומטית. ב-prod, מומלץ להשתמש ב-migrations.
      }),
      inject: [ConfigService],
    }),
    JobsModule,
    AuthModule, // הוסף את מודול האותנטיקציה
    UsersModule, // הוסף את מודול המשתמשים
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // הגדרת ה-Guard כגלובלי
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
