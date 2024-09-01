import { PartialType } from '@nestjs/mapped-types';
import { CreatePetCategoryDto } from './create-pet-category.dto';
import { IsInt, IsOptional } from 'class-validator';

export class QueryPetDto extends PartialType(CreatePetCategoryDto) {
    @IsOptional()
    @IsInt({ each: true })
    id?: number | number[];

    @IsOptional()
    @IsInt({ each: true })
    categoryId?: number | number[];
}
