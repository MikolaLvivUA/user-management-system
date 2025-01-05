import { Injectable } from '@nestjs/common';
import { PrismaRepository, DelegateArgs, DelegateReturnTypes } from 'prisma/prisma.repository';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type UsersDelegate = Prisma.UserDelegate<DefaultArgs>;

@Injectable()
export class UsersRepository extends PrismaRepository<
  UsersDelegate,
  DelegateArgs<UsersDelegate>,
  DelegateReturnTypes<UsersDelegate>
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user);
  }
}
