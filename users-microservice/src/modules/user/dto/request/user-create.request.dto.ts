import { User } from '../../../../../prisma/generated/classes/user';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(User, ['firstName', 'lastName', 'email', 'password']) {}
