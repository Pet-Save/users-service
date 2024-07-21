import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactUsFormDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
    
export class CreateFormDto {}
