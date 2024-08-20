import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { EntityManager, IDatabaseDriver, Connection, MikroORM } from '@mikro-orm/core';
import { PetCategories } from './entities/pet_categories.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Gender } from '../settings/entities/gender.entity';
import { Pets } from './entities/pets.entity';
import { PetImages } from './entities/pet_images.entity';

@Injectable()
export class PetsService {

  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  async createPet(createPetDto: CreatePetDto) {
    try {
      const petCategory = await this.em.findOneOrFail(PetCategories, createPetDto.categoryId);
      const gender = await this.em.findOneOrFail(Gender, createPetDto.genderId);
      const pet = this.em.create(Pets, {
        name: createPetDto.name,
        petCategory,
        gender,
        createdBy: createPetDto.email,
        updatedBy: createPetDto.email
      })
      await this.em.flush();
      return pet
    } catch(e) {
      return e
    }
  }

  async createPetImages(petId: number | Pets, images: string[], email: string) {
    try {
      let temp = petId;
      if(typeof petId === 'number') temp = await this.em.findOneOrFail(Pets, petId);
      const pet = temp as Pets;
      images.forEach((image) => {
        pet.images.add(this.em.create(PetImages, {
          pet,
          imageUrl: image,
          createdBy: email,
          updatedBy: email
        }))
      })
      await this.em.flush();
      return pet.images;
    } catch(e) {
      return e
    }
  }

  async createPetCategory(createPetCategoryDto: CreatePetCategoryDto) {
    try {
      const category = this.em.create(PetCategories, {
        value: createPetCategoryDto.value.toUpperCase(),
        createdBy: createPetCategoryDto.email,
        updatedBy: createPetCategoryDto.email
      })
      await this.em.flush();
      return category
    } catch(e) {
      return e
    }
  }

}
