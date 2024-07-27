import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsBoolean, IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { IsAtLeastOneFieldDefined } from 'src/common/decorators/isAtLeastOneFieldDefined';
import { Day } from '../entities/volunteers-availability.entity';

class Timetable {
    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    monday?: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    tuesday: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    wednesday: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    thursday: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    friday: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    saturday: boolean[];

    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true })
    sunday: boolean[]
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
