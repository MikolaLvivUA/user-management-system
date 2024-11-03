import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UsersDto } from '../users.dto';

export class UserResponse extends UsersDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
