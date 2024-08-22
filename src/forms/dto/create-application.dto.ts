import { Type } from "class-transformer";
import { IsString, Length, IsNotEmpty, IsEmail, IsInt, IsNumber, ValidateNested, IsOptional, IsBoolean, ValidateIf, IsArray, ArrayMinSize, ArrayMaxSize, IsEnum } from "class-validator";
import "reflect-metadata"

export enum HOUSEHOLD_TYPES {
    SINGLE = 'single',
    FAMILY = 'family',
    SHARED = 'shared',
}

export enum HOUSEHOLD_MEMBER_TYPE {
    CHILD = 'child',
    ADULT = 'adult',
    PET = 'pet'    
}

class ReferenceInfo  {
    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    name: string

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    phoneNumber: string
}

export class HouseholdMemberInfo {
    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    name: string

    @IsInt()
    @IsNotEmpty()
    age: number

    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    occupation: string
}

export class CreateApplicationDto {
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    adoptPet: string[]

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    fosterPetTypeId: number[]

    @ValidateIf(o => o.householdType !== HOUSEHOLD_TYPES.SINGLE)
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => HouseholdMemberInfo)
    householdMemberInfo: HouseholdMemberInfo[];

    @ValidateIf(o => o.havePetNow)
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    petsInfo: number[];

    @ValidateIf(o => o.haveChildren)
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    childrenInfo: number[];

    /* MANDATORY FIELD */
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

    @Length(1, 255)
    @IsNotEmpty()
    address: string;

    @Length(1, 50)
    @IsNotEmpty()
    city: string;

    @Length(1, 20)
    @IsNotEmpty()
    postalCode: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    socialMediaAccount: string;

    @IsBoolean()
    @IsNotEmpty()
    allowPets: boolean;

    @IsBoolean()
    @IsNotEmpty()
    haveAllergy: boolean;
    
    @IsBoolean()
    @IsNotEmpty()
    haveFencedYard: boolean;

    @IsBoolean()
    @IsNotEmpty()
    haveWhatsapp: boolean;

    @IsBoolean()
    @IsNotEmpty()
    havePetBefore: boolean;

    @IsBoolean()
    @IsNotEmpty()
    havePetNow: boolean;

    @IsBoolean()
    @IsNotEmpty()
    haveSurrenderedPetBefore: boolean;

    @Type(() => Number)
    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: 'hoursAlone should be 2 digits max'
    })
    @IsNotEmpty()
    hoursAlone: number;

    @IsString()
    @IsNotEmpty()
    stayingPlace: string;

    @IsString()
    @IsNotEmpty()
    prohibitedPlace: string;

    @IsString()
    @IsNotEmpty()
    outOfTownPlan: string;

    @IsString()
    @IsNotEmpty()
    experience: string;

    @IsBoolean()
    @IsNotEmpty()
    haveChildren: boolean;

    @IsEnum(HOUSEHOLD_TYPES)
    @IsNotEmpty()
    householdType: HOUSEHOLD_TYPES

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    houseOwnershipId: number

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @ValidateNested({ each: true })
    @Type(() => ReferenceInfo)
    referenceInfo: ReferenceInfo[];
}
