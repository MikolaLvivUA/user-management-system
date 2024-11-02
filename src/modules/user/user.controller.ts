import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi } from 'src/common';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';
import { UsersService } from './user.service';

@LoggerApi()
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '[CreateUser]',
    description: 'Create user',
  })
  @ApiResponse({ type: UserResponse })
  @HttpCode(HttpStatus.OK)
  async create(@Body() data: CreateUserDto): Promise<UserResponse> {
    return await this.usersService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: '[GetAllUsers]',
    description: 'Get all users',
  })
  @ApiResponse({ type: UserResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '[GetUserById]',
    description: 'Get user by id',
  })
  @ApiResponse({ type: UserResponse })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<UserResponse> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '[UpdateUserById]',
    description: 'Update user by id',
  })
  @ApiResponse({ type: UserResponse })
  @HttpCode(HttpStatus.OK)
  async updateById(@Param('id') id: string, @Body() data: Partial<CreateUserDto>): Promise<UserResponse> {
    return await this.usersService.updateById(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '[DeleteUserById]',
    description: 'Delete user by id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteById(id);
  }
}
