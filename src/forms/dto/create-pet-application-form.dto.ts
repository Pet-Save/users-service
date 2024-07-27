import { IsString, IsEmail, IsEnum, IsNumber, IsBoolean, ValidateIf, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { CreateApplicantsHouseholdInfoDto } from './create-applicants-household-info.dto';
import { Transform, Type } from 'class-transformer';
import { CreateApplicantsChildrenInfoDto } from './create-applicants-children-info.dto';
import { CreateApplicantsPetsInfoDto } from './create-applicants-pet-info.dto';
import { CreateApplicantsReferencesInfoDto } from './create-applicants-references-info.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export enum HouseholdType {
    SINGLE = 'single',
    FAMILY = 'family',
    ROOMMATE = 'roommate',
}

export enum HouseOwnership {
    RENT = 'rent',
    OWN = 'own'
}

export enum FosterPetType {
    CAT = 'cat',
    DOG = 'dog'
}

export class CreatePetApplicationFormDto {
    @IsNumber()
    age: number

    @IsEmail()
    email: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    phoneNumber: string

    @IsString()
    socialMediaAccount: string

    @IsString()
    address: string

    @IsString()
    city: string

    @IsString()
    postalCode: string

    @IsString()
    stayingPlace: string;

    @IsString()
    prohibitedPlace: string;

    @IsString()
    experience: string;

    @IsString()
    outOfTownPlan: string;

    @IsString()
    @IsEnum(HouseOwnership)
    houseOwnership: HouseOwnership;

    @IsString()
    @IsEnum(HouseholdType)
    householdType: HouseholdType;

    @ValidateIf(o => o.householdType !== HouseholdType.SINGLE)
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicantsHouseholdInfoDto)
    houseHoldInfo: CreateApplicantsHouseholdInfoDto[]

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    haveChildren: boolean;

    @ValidateIf(o => o.haveChildren)
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicantsChildrenInfoDto)
    childrenInfo: CreateApplicantsChildrenInfoDto[]

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    havePetNow: boolean;

    @ValidateIf(o => o.havePetNow)
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicantsPetsInfoDto)
    petsInfo: CreateApplicantsPetsInfoDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicantsReferencesInfoDto)
    referencesInfo: CreateApplicantsReferencesInfoDto[]

    @IsBoolean()
    allowPets: boolean;

    @IsBoolean()
    haveFencedYard: boolean;

    @IsBoolean()
    haveAllergy: boolean;

    @IsBoolean()
    haveWhatsapp: boolean;

    @IsBoolean()
    havePetBefore: boolean;

    @IsBoolean()
    haveSurrenderedPetBefore: boolean;
}

export class CreatePetFosterApplicationForms extends CreatePetApplicationFormDto {
    @ValidateIf(o => o.fosterTypes)
    @IsArray()
    @IsEnum(FosterPetType, { each: true })
    fosterTypes: FosterPetType;
}

export class CreatePetAdoptApplicationForms extends CreatePetApplicationFormDto {
    @ValidateIf(o => o.adoptPets)
    @IsArray()
    @IsString({ each: true })
    adoptPets: string[];
}

export class CreatePetFormDto extends IntersectionType(
    CreatePetFosterApplicationForms,
    CreatePetAdoptApplicationForms,
  ) {}
