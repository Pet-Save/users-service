import { Injectable } from '@nestjs/common';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { MikroORM } from '@mikro-orm/core';
import { PetCategories } from './entities/pet_categories.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Gender } from '../settings/entities/gender.entity';
import { Pets } from './entities/pets.entity';
import { PetImages } from './entities/pet_images.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class PetsService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(PetCategories)
    private readonly petCategoriesRepository: EntityRepository<PetCategories>,
    @InjectRepository(Gender)
    private readonly genderRepository: EntityRepository<Gender>,
    @InjectRepository(Pets)
    private readonly petsRepository: EntityRepository<Pets>,
    @InjectRepository(PetImages)
    private readonly petImagesRepository: EntityRepository<PetImages>,
  ) {
    const forkedEm = this.orm.em.fork();
    this.petCategoriesRepository = forkedEm.getRepository(PetCategories);
    this.genderRepository = forkedEm.getRepository(Gender);
    this.petsRepository = forkedEm.getRepository(Pets);
    this.petImagesRepository = forkedEm.getRepository(PetImages);
  }

  async createPet(createPetDto: CreatePetDto) {
    try {
      const petCategory = await this.findOnePetCategory(createPetDto.categoryId);
      const gender = await this.genderRepository.findOneOrFail(createPetDto.genderId);
      const pet = this.petsRepository.create({
        name: createPetDto.name,
        petCategory,
        gender,
        createdBy: createPetDto.email,
        updatedBy: createPetDto.email
      })
      await this.petsRepository.getEntityManager().persistAndFlush(pet)
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
      await this.petsRepository.getEntityManager().persistAndFlush(pet);
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
      await this.petCategoriesRepository.getEntityManager().persistAndFlush(category);
      return category
    } catch(e) {
      console.error(e);
      return e
    }
  }

  findOnePetCategory(id: number) {
    return this.petCategoriesRepository.findOneOrFail(id);
  }

  findMultiplePetCategory(ids: number[]) {
    return this.petCategoriesRepository.find({
      id: { $in: ids }
    });
  }


}
