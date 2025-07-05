// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ייבוא ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // ודא שזה תואם לכתובת של ה-Frontend שלך
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // חשוב עבור שליחת קוקיז/הדרים
  });

  // הוספת ValidationPipe גלובלי
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // יסיר אוטומטית Properties שאינם מוגדרים ב-DTO
      forbidNonWhitelisted: true, // יזרוק שגיאה אם יש Properties שאינם מוגדרים
      transform: true, // ימיר אוטומטית קלט לטיפוסים המתאימים לפי ה-DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
