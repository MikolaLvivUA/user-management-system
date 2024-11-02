import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
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

  @ApiProperty({ example: '1234567' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
