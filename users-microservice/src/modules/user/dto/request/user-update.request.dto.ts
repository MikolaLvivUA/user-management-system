import { PartialType } from '@nestjs/mapped-types';
import { User } from '../../../../../prisma/generated/classes/user';

export class UpdateUserDto extends PartialType(User) {}
