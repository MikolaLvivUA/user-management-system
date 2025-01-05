import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../../../../prisma/generated/classes/user';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserListResponse extends PickType(User, ['id', 'firstName', 'lastName'] as const) {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;
}
