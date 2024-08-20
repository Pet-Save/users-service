import { IsEmail, IsNotEmpty, IsString, IsInt, IsArray, ArrayMinSize } from "class-validator";

export class CreatePetImageDto {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    imageUrl: string[];

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    petId: number;

}