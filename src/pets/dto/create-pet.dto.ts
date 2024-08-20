import { IsEmail, Length, IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreatePetDto {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    categoryId: number;

    @IsInt()
    @IsNotEmpty()
    genderId: number;
}