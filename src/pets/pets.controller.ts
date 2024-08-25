import { Body, Controller, Post } from '@nestjs/common';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetImageDto } from './dto/create-pet-image.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('/categories')
  createPetCategory(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    return this.petsService.createPetCategory(createPetCategoryDto);
  }

  @Post('/images')
  createPetImages(@Body() createPetImageDto: CreatePetImageDto) {
    return this.petsService.createPetImages(
      createPetImageDto.petId,
      createPetImageDto.imageUrl,
      createPetImageDto.email,
    );
  }

  @Post()
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPet(createPetDto);
  }
}
