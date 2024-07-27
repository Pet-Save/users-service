import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateTimeSessionDto {
    @IsString()
    @IsNotEmpty()
    timeSession: string; 

    @IsEmail()
    @IsNotEmpty()
    email: string; 
}
