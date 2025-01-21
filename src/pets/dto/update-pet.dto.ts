import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class PartialCreatePetDto extends PartialType(CreatePetDto) {
    
    @IsBoolean()
    @IsOptional()
    isFostered?: boolean;

    @IsBoolean()
    @IsOptional()
    isAdopted?: boolean;
}

export class UpdatePetDto extends PartialType(PartialCreatePetDto) {};
