import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';
import { LoggerServiceDecorator } from 'src/common';
import { UsersRepository } from '../repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  @LoggerServiceDecorator()
  async create(data: CreateUserDto): Promise<UserResponse> {
    try {
      const { password, firstName, lastName } = data;
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.userRepository.create({
        data: {
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new BadRequestException(`[create-Users] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async findAll(): Promise<UserResponse[]> {
    try {
      return await this.userRepository.findMany();
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

      if(data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await this.userRepository.update( { where: { id },
          data: {
            ...data,
              password: hashedPassword
          }
        })
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
