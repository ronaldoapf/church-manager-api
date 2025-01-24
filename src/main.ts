import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './http-exception.filter'
import { EnvType } from './env'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation-pipe'
import './instrument'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } })

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port)

  console.log(`🚀 Server running on port ${port}`)
}

bootstrap()
