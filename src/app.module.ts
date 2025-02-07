import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './pipes/validation-pipe'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { SentryTestModule } from './sentry/sentry.module'
import { envSchema } from './env'
import { TokenService } from './token/token.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    AuthModule,
    UserModule,
    SentryTestModule,
  ],
  exports: [],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    PrismaService,
    TokenService,
  ],
})
export class AppModule {}
