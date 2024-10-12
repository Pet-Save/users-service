import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';
import { ValidationException } from '../error-handler/errors/ValidationException';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { ServerException } from '../error-handler/errors/ServerException';


@Injectable()
export class UsersService {
  private cryptr: Cryptr;
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {
    const secret = this.configService.get('PASSWORD_SECRET');
    this.cryptr = new Cryptr(secret);
  }

  async create({ email, password }: CreateUserDto) {
    const exists = await this.usersRepository.findOne({ email });
    if(exists) throw new ValidationException(
      'Email already exists.',
      'UsersService.create',
      { email, password }
    );
    const encryptedPassword = this.cryptr.encrypt(password);
    const user = this.usersRepository.create({
      email,
      password: encryptedPassword,
      createdBy: email,
      updatedBy: email,
    })
    return this.usersRepository.createAndSave(user);
  }

  async login({ email, password }: CreateUserDto) {
    const exists = await this.usersRepository.findOne({ email });
    if(!exists) throw new ValidationException(
      'Incorrent Email or Password.',
      'UsersService.login',
      { email, password },
      'Email does not match records in database.'
    );

    const decryptedPassword = this.cryptr.decrypt(exists.password);
    if(password !== decryptedPassword) throw new ValidationException(
      'Incorrent Email or Password.',
      'UsersService.login',
      { email, password },
      'Password does not match record in database.'
    );
    const jwtSecret = await this.configService.get('JWT_SECRET');
    if(!jwtSecret) throw new ServerException(
      'Server Error.',
      'UsersService.login',
      null,
      'Missing JWT_SECRET in environment variables'
    );
    const accessToken = await this.jwtService.signAsync({ data: JSON.stringify(exists) });
    return accessToken;
  }
}
