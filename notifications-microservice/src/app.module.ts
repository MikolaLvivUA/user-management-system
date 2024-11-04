import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

//Processors
import { NotificationProcessor } from './processors';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        // host: 'localhost',
        host: 'redis-mq',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 5000,
        attempts: 3,
      },
    }),
    BullModule.registerQueue({
      name: 'notifications-queue',
    }),
  ],
  providers: [NotificationProcessor],
})
export class AppModule {}
