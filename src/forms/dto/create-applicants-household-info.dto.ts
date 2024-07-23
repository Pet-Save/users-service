import { IsString, IsNumber, IsEmail, IsOptional } from "class-validator"

export class CreateApplicantsHouseholdInfoDto {
    @IsString()
    name: string

    @IsString()
    occupation: string

    @IsNumber()
    age: number

    @IsEmail()
    email: string
}