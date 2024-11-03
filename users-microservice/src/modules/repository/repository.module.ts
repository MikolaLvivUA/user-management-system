import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

//Repositories
import { UsersRepository } from './repositories/users.repository';

const providers = [PrismaService, UsersRepository];

@Module({
  providers,
  exports: providers,
})
export class RepositoriesModule {}
