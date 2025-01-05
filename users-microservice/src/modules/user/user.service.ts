import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UserListResponse, UserResponse } from './dto';
import { LoggerServiceDecorator } from 'src/common';
import { UsersRepository } from '../repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_DELAY } from './definitions';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    @InjectQueue('users-queue') private readonly userQueue: Queue,
  ) {}

  @LoggerServiceDecorator()
  async create(data: CreateUserDto): Promise<UserResponse> {
    try {
      const { password, firstName, lastName, email } = data;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: any = await this.userRepository.create({
        data: {
          firstName,
          lastName,
          password: hashedPassword,
          email,
        },
      });

      await this.userQueue.add(
        'sendNotification',
        { userId: user.id },
        { delay: QUEUE_DELAY || 10000 },
      );
      return user;
    } catch (error) {
      throw new BadRequestException(`[create-Users] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async findAll(): Promise<UserListResponse[]> {
    try {
      const result = await this.userRepository.findMany();

      return result;
    } catch (error) {
      throw new BadRequestException(`[findAll-Users] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async findById(id: string): Promise<UserResponse> {
    try {
      return await this.userRepository.findFirst({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`[findById-Users] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async updateById(id: string, data: Partial<CreateUserDto>): Promise<UserResponse> {
    try {
      const existsUser = await this.userRepository.findFirst({ where: { id } });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await this.userRepository.update({
          where: { id },
          data: {
            ...data,
            password: hashedPassword,
            email: data.email,
          },
        });
      }

      return await this.userRepository.update({ where: { id }, data });
    } catch (error) {
      throw new BadRequestException(`[updateById-Users] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async deleteById(id: string): Promise<void> {
    try {
      const existsUser = await this.userRepository.findFirst({ where: { id } });

      if (!existsUser) {
        throw new BadRequestException('User not found');
      }

      await this.userRepository.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`[deleteById-Users] error: ${error.message}`);
    }
  }
}
