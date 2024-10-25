import { IsEmail, Length, IsNotEmpty, IsString, IsInt, IsDate, IsBoolean, IsNumber, IsOptional, IsISO8601 } from "class-validator";

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

    @IsISO8601()
    @IsOptional()
    dateOfBirth: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    personality: string;

    @IsString()
    @IsOptional()
    characteristics: string;

    @IsString()
    @IsOptional()
    breed: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    healthStatus: string;

    @IsString()
    @IsOptional()
    idealFamily: string;

    @IsNumber()
    @IsOptional()
    weight: number;

    @IsBoolean()
    @IsOptional()
    houseTrained: boolean;
}