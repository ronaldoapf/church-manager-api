import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './pipes/validation-pipe'
import { MemberModule } from './member/member.module'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { SentryTestModule } from './sentry/sentry.module'
import { AuthorizationModule } from './authorization/authorization.module'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    AuthModule,
    MemberModule,
    SentryTestModule,
    AuthorizationModule,
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
  ],
})
export class AppModule {}
