import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
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

      const hashedPassword = await bcrypt.hash(password, 12);

      const createUser = await this.userService.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      delete createUser.password;
      delete createUser.role;

      return { createUser };
    } catch (error) {
      throw error;
    }
  }

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and Password required');
      }

      const findUser = await this.userService.findOne({ email });

      if (!findUser) {
        throw new BadRequestException('Email not register');
      }

      if (
        !(await this.authService.comparePassword(password, findUser.password))
      ) {
        throw new BadRequestException('password is wrong');
      }

      const token = await this.authService.generateJWT(findUser);

      return { token };
    } catch (error) {
      throw error;
    }
  }
}
