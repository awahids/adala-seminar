import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async updateOne(id: number, user: User): Promise<any> {
    delete user.email;
    delete user.name;
    delete user.password;
    delete user.username;

    return this.userRepository.update(id, user);
  }

  async deleteOne(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
