import { Module } from '@nestjs/common'
import { SentryController } from './sentry.controller'

@Module({
  controllers: [SentryController],
})
export class SentryTestModule {}
