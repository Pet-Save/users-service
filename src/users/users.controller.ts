import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get()
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    try {
      const accessToken = await this.usersService.login(email, password);
      return accessToken;
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return newUser
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }
}
