import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { QueryPetDto } from './dto/query-pet.dto';
import { PetsService } from './pets.service';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/:petId/images')
  @UseInterceptors(FilesInterceptor('images'))
  async createPetImages(
    @User() user: any,
    @Param('petId') petId: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    try {
      const imageUrls = await this.petsService.createPetImages(petId, images, user.email);
      return {
        fulfilled: imageUrls.getFulfilled(),
        rejected: imageUrls.getRejected(),
      }
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

  @UseGuards(AuthGuard)
  @Post('/categories')
  createPetCategory(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    return this.petsService.createPetCategory(createPetCategoryDto);
  }

  @Get('/categories')
  findAllPetCategory() {
    return this.petsService.findAllPetCategory();
  }

  @Get('/categories/:id')
  findOnePetCategory(@Param('id')id: number) {
    return this.petsService.findOnePetCategory(id);
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

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updatePet(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    try {
      const updatedPet = await this.petsService.updatePet(id, updatePetDto);
      return updatedPet;
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePet(@Param('id') id: number) {
    try {
      const deletedPet = await this.petsService.deletePet(id);
      return deletedPet;
    } catch(e) {
      this.errorHandlerService.handleError(e)
    }
  }

  @Get()
  findPets(@Body()options: QueryPetDto) {
    return this.petsService.findPet(options);
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
}
