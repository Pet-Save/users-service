import { IsString, IsNumber, IsEmail, IsOptional } from "class-validator"

export class CreateApplicantsChildrenInfoDto {
    @IsNumber()
    age: number

    @IsEmail()
    email: string
}