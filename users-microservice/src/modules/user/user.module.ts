import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { RepositoriesModule } from 'src/modules/repository';
import { BullModule } from '@nestjs/bullmq';

const providers = [UsersService, RepositoriesModule];
const imports = [
  RepositoriesModule,
  BullModule.registerQueue({
    name: 'users-queue', // Register the queue here
  }),
];

@Module({
  imports,
  providers,
  controllers: [UsersController],
  exports: providers,
})
export class UserModule {}
