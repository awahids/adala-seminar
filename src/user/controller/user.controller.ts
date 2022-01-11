import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';
import { User, UserRole } from '../models/user.interface';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const findUser = await this.userService.findOne({
        where: { id },
        relations: ['registeredSeminar', 'registeredSeminar.seminar'],
      });

      delete findUser.password;
      delete findUser.role;

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userService.findAll();

      users.forEach(function (v) {
        delete v.password;
        delete v.role;
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  async deleteOne(@Param('id') id: string): Promise<string> {
    try {
      const deleteUser = await this.userService.deleteOne(Number(id));

      if (!deleteUser) {
        throw new InternalServerErrorException('Unable to delete data');
      }

      return 'Delete Successfully';
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  async updateOne(@Param('id') id: string, @Body() user: User): Promise<User> {
    try {
      const updateData = await this.userService.updateOne(Number(id), user);

      if (!updateData) {
        throw new InternalServerErrorException('Unable to update data');
      }

      const getData = await this.userService.findOne(Number(id));

      delete getData.password;
      delete getData.role;

      return getData;
    } catch (error) {
      throw error;
    }
  }
}
