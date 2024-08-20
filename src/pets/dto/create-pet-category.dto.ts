import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator";

export class CreatePetCategoryDto {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    value: string;
}
