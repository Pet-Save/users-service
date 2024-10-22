import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Users } from './entities/user.entity';
import { ErrorHandlerModule } from '../error-handler/error-handler.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MikroOrmModule.forFeature([
      Users,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 60 * 60 },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    ErrorHandlerModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}
