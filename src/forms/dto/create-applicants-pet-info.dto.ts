import { IsNumber, IsEmail } from "class-validator"

export class CreateApplicantsPetsInfoDto {
    @IsNumber()
    age: number

    @IsEmail()
    email: string
}