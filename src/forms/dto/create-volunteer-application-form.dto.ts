import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { IsAtLeastOneFieldDefined } from 'src/common/decorators/isAtLeastOneFieldDefined';
import { Day } from '../entities/volunteers-availability.entity';

class Timetable {
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    monday?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    tuesday: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    wednesday: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    thursday: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    friday: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    saturday: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    sunday: number[]
}

export class CreateVolunteerApplicationFormDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    postalCode: string

    @IsString()
    @IsNotEmpty()
    occupation: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    age: number

    @IsString()
    @IsNotEmpty()
    emergencyContactName: string;

    @IsString()
    @IsNotEmpty()
    emergencyContactPhoneNumber: string;

    @IsNotEmptyObject()
    @IsAtLeastOneFieldDefined(Object.values(Day))
    @Type(() => Timetable)
    @ValidateNested()
    timetable!: Timetable;
}
