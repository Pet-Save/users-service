import { IsString, IsNumber, IsEmail } from "class-validator"

export class CreateApplicantsHouseholdDto {
    @IsString()
    name: string

    @IsString()
    occupation: string

    @IsNumber()
    age: number

    @IsEmail()
    email: string
}