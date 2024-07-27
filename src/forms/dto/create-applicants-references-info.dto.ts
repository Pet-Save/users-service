import { IsString } from "class-validator"

export class CreateApplicantsReferencesInfoDto {
    @IsString()
    name: string

    @IsString()
    phoneNumber: string

    @IsString()
    email: string
}