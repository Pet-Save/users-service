import { Injectable, NotFoundException } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pets } from './entities/pets.entity';
import { PetCategoriesRepository } from './repositories/pet-categories.repository';
import { PetImagesRepository } from './repositories/pet-images.repository';
import { PetsRepository } from './repositories/pets.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { QueryPetDto } from './dto/query-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly em: EntityManager,
    private readonly petCategoriesRepository: PetCategoriesRepository,
    private readonly petsRepository: PetsRepository,
    private readonly petImagesRepository: PetImagesRepository,
  ) {}

  async createPet(createPetDto: CreatePetDto) {
    try {
      const petCategory = await this.findOnePetCategory(createPetDto.categoryId);
      const gender = await this.settingsService.findOneGender(createPetDto.genderId);
      const pet = this.petsRepository.create({
        name: createPetDto.name,
        petCategory,
        gender,
        createdBy: createPetDto.email,
        updatedBy: createPetDto.email
      })
      await this.em.persistAndFlush(pet)
      return pet
    } catch(e) {
      console.error(e)
      return e
    }
  }

  async createPetImages(petId: number | Pets, images: string[], email: string) {
    try {
      let temp = petId;
      if(typeof petId === 'number') temp = await this.petsRepository.findOneOrFail(petId);
      const pet = temp as Pets;
      images.map((image) => {
        const imageInstance = this.petImagesRepository.create({
          pet,
          imageUrl: image,
          createdBy: email,
          updatedBy: email
        });
        pet.images.add(imageInstance);
        return imageInstance
      })
      await this.em.persistAndFlush(pet);
      return images;
    } catch(e) {
      console.error(e)
      return e
    }
  }

  async createPetCategory(createPetCategoryDto: CreatePetCategoryDto) {
    try {
      const category = this.petCategoriesRepository.create({
        value: createPetCategoryDto.value.toLowerCase(),
        createdBy: createPetCategoryDto.email,
        updatedBy: createPetCategoryDto.email
      })
      await this.em.persistAndFlush(category);
      return category
    } catch(e) {
      console.error(e);
      return e
    }
  }

  findAllPetCategory() {
    try {
      return this.petCategoriesRepository.findAll();
    } catch(e) {
      throw new NotFoundException()
    }
  }

  findOnePetCategory(id: number) {
    try {
      return this.petCategoriesRepository.findOneOrFail(id);
    } catch(e) {
      throw new NotFoundException(`Pet Category ${id} does not exist`)
    }
  }

  findPet(options: QueryPetDto) {
    try {
      const option: any = {};
      if(options.id) option.id = options.id;
      if(options.categoryId) option.petCategory = options.categoryId;
      return this.petsRepository.find(option);
    } catch(e) {
      throw e
    }
  }

  findMultiplePetCategory(ids: number[]) {
    return this.petCategoriesRepository.find({
      id: { $in: ids }
    });
  }
}
