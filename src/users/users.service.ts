import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import Cryptr from 'cryptr';
import { UsersRepository } from './repositories/users.repository';
import { ValidationException } from '../error-handler/errors/ValidationException';

@Injectable()
export class UsersService {
  private cryptr: Cryptr;
  
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
  ) {
    const secret = this.configService.get('PASSWORD_SECRET');
    this.cryptr = new Cryptr(secret);
  }

  async create({ email, password }: CreateUserDto) {
    const exists = await this.usersRepository.findOne({ email });
    if(exists) throw new ValidationException(
      'Email already exists.',
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
      { email, password },
      'Email does not match records in database.'
    );

    const decryptedPassword = this.cryptr.decrypt(exists.password);
    if(password !== decryptedPassword) throw new ValidationException(
      'Incorrent Email or Password.',
      { email, password },
      'Password does not match record in database.'
    );
    return exists;
  }
}
