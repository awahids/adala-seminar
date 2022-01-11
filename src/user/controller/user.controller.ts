import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') _role: string,
  ) {
    try {
      if (name === undefined) {
        throw new BadRequestException('Name Required');
      }

      if (username === undefined) {
        throw new BadRequestException('Username Required');
      }

      if (email === undefined) {
        throw new BadRequestException('Email Required');
      }

      if (password === undefined) {
        throw new BadRequestException('Password Required');
      }

      const checkEmail = await this.userService.findOne({ email });
      if (checkEmail) {
        throw new BadRequestException('Email al ready user');
      }

      const createUser = await this.userService.create({
        name,
        username,
        email,
        password,
        role: UserRole.USER,
      });

      delete createUser.password;
      delete createUser.role;

      return { createUser };
    } catch (error) {
      throw error;
    }
  }
}
