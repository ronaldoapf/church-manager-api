import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './http-exception.filter'
import { EnvType } from './env'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation-pipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import './instrument'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } })

  const config = new DocumentBuilder()
    .setTitle('Church Manager')
    .setDescription('The church manager API description')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get<ConfigService<EnvType, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port)

  console.log(`🚀 Server running on port ${port}`)
}

bootstrap()
