import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './http-exception.filter';
import { EnvType } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } })
  
  app.useGlobalFilters(new HttpExceptionFilter())

  const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port)

  console.log(`🚀 Server running on port ${port}`)
}

bootstrap();