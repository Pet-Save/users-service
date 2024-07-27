import { IsNumber, IsEmail } from "class-validator"

export class CreateApplicantsChildrenInfoDto {
    @IsNumber()
    age: number

    @IsEmail()
    email: string
}