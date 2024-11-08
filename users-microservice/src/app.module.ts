import { Module } from '@nestjs/common';

//Modules
import { BullModule } from '@nestjs/bullmq';
import { RepositoriesModule, UserModule } from './modules';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'redis-mq',
        // host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 5000,
        attempts: 3,
      },
    }),
    RepositoriesModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
