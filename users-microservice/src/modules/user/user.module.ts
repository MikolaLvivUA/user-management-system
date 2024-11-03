import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { RepositoriesModule } from 'src/modules/repository';

const providers = [UsersService, RepositoriesModule];
const imports = [RepositoriesModule];

@Module({
  imports,
  providers,
  controllers: [UsersController],
  exports: providers,
})
export class UserModule {}
