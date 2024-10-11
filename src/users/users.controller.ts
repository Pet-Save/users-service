import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get()
  login(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.login(createUserDto);
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

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
