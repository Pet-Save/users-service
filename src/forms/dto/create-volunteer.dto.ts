import { Type } from "class-transformer";
import { IsOptional, IsArray, IsInt, IsString, IsNotEmpty, IsEmail, IsNotEmptyObject, ValidateNested, Length, IsDecimal, IsNumber, IsEnum } from "class-validator";
import { IsAtLeastOneFieldDefined } from "../../common/decorators/isAtLeastOneFieldDefined";

export enum DAY {
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
    SUNDAY = 'sunday'
}

export enum TIME {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    EVENING = 'evening',
    WHOLE_DAY = 'whole_day',
}

class Timetable {
    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    monday?: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    tuesday: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    wednesday: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    thursday: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    friday: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    saturday: TIME[];

    @IsOptional()
    @IsArray()
    @IsEnum(TIME, { each: true })
    sunday: TIME[]
}

export class CreateVolunteerDto {
    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    lastName: string;
    
    @IsEmail()
    @Length(1, 100)
    @IsNotEmpty()
    email: string

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    phoneNumber: string

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    age: number

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    address: string

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    city: string

    @IsString()
    @Length(1, 20)
    @IsNotEmpty()
    postalCode: string

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    occupation: string

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    emergencyContactName: string;

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    emergencyContactPhoneNumber: string;

    @Type(() => Number)
    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: 'distanceWillingToTravel should be 2 digits max'
    })
    @IsNotEmpty()
    distanceWillingToTravel: number;

    @IsNotEmptyObject()
    @IsAtLeastOneFieldDefined(Object.values(DAY))
    @Type(() => Timetable)
    @ValidateNested()
    timetable!: Timetable;
}