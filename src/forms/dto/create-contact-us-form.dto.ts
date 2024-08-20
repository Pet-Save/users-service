import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateContactUsFormDto {
    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @Length(1, 100)
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}

export class CreateFormDto {}
