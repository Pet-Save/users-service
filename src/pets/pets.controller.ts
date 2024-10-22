import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetImageDto } from './dto/create-pet-image.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { QueryPetDto } from './dto/query-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/categories')
  createPetCategory(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    return this.petsService.createPetCategory(createPetCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Post('/images')
  createPetImages(@Body() createPetImageDto: CreatePetImageDto) {
    return this.petsService.createPetImages(
      createPetImageDto.petId,
      createPetImageDto.imageUrl,
      createPetImageDto.email,
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.petsService.createPet(createPetDto);
  }

  @Get()
  findPets(@Body()options: QueryPetDto) {
    return this.petsService.findPet(options);
  }

  @Get('/categories')
  findAllPetCategory() {
    return this.petsService.findAllPetCategory();
  }

  @Get('/categories/:id')
  findOnePetCategory(@Param('id')id: number) {
    return this.petsService.findOnePetCategory(id);
  }
}
