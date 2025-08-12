import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 5000);
  console.log(`Server is running on port ${process.env.PORT ?? 5000}`);

  if (process.env.NODE_ENV === 'development') {
    try {
      const seedService = app.get(SeedService);
      await seedService.seed();
    } catch (error) {
      console.log('Seeding skipped or failed:', error.message);
    }
  }
}
bootstrap();
