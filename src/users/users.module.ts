import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Users } from './entities/user.entity';
import { ErrorHandlerModule } from '../error-handler/error-handler.module';

@Module({
  imports:[
    MikroOrmModule.forFeature([
      Users,
    ]),
    ConfigModule,
    ErrorHandlerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
