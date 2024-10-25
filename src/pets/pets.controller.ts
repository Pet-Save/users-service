import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetImageDto } from './dto/create-pet-image.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { QueryPetDto } from './dto/query-pet.dto';
import { PetsService } from './pets.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { ValidationError } from '@mikro-orm/postgresql';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly errorHandlerService: ErrorHandlerService,
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
  async createPet(@Body() createPetDto: CreatePetDto) {
    try {
      const newPet = await this.petsService.createPet(createPetDto);
      return newPet
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

  @Get('/:id')
  async findOnePet(@Param('id') id: number) {
    try {
      const pet = await this.petsService.findOnePet(id);
      return pet
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
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
