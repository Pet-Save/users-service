import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../aws/s3/s3.service';
import EFileDirectory from '../common/enums/s3FileDirectory';
import { SettingsService } from '../settings/settings.service';
import { CreatePetCategoryDto } from './dto/create-pet-category.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { QueryPetDto } from './dto/query-pet.dto';
import { PetCategoriesRepository } from './repositories/pet-categories.repository';
import { PetImagesRepository } from './repositories/pet-images.repository';
import { PetsRepository } from './repositories/pets.repository';
import { ConfigService } from '@nestjs/config';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
	private cloudfrontBaseUrl: string;
	
	constructor(
		private readonly settingsService: SettingsService,
		private readonly s3Service: S3Service,
		private readonly em: EntityManager,
		private readonly petCategoriesRepository: PetCategoriesRepository,
		private readonly petsRepository: PetsRepository,
		private readonly petImagesRepository: PetImagesRepository,
        private configService: ConfigService,
	) {
        this.cloudfrontBaseUrl = (this.configService.get('AWS_CLOUDFRONT_BASE_URL') as string);
	}

	async createPet(createPetDto: CreatePetDto) {
		const petCategory = await this.findOnePetCategory(createPetDto.categoryId);
		const gender = await this.settingsService.findOneGender(createPetDto.genderId);
		const { categoryId, genderId, ...info } = createPetDto;
		const pet = this.petsRepository.create({
			petCategory,
			gender,
			...info,
			createdBy: createPetDto.email,
			updatedBy: createPetDto.email
		})
		await this.em.persistAndFlush(pet)
		return pet
	}

	async createPetImages(petId: number, images: Express.Multer.File[], email: string) {
		const pet = await this.petsRepository.findOneOrFail(petId);
		const result = await this.s3Service.uploadImages(EFileDirectory.PETS, petId, images);
		result.getFulfilled().map((url: string) => {
			const imageInstance = this.petImagesRepository.create({
			  pet,
			  imageUrl: `${this.cloudfrontBaseUrl}/${url}`,
			  createdBy: email,
			  updatedBy: email
			});
			pet.images.add(imageInstance);
			return imageInstance
		})
		await this.em.persistAndFlush(pet);
		return result;
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
		} catch (e) {
			console.error(e);
			return e
		}
	}

	async findAllPetCategory() {
		try {
			const categories = await this.petCategoriesRepository.findAll();
			return categories
		} catch (e) {
			throw new NotFoundException()
		}
	}

	findOnePetCategory(id: number) {
		return this.petCategoriesRepository.findOneOrFail(id);
	}

	findOnePet(id: number) {
		return this.petsRepository.findOneOrFail(id)
	}

	findPet(options: QueryPetDto) {
		try {
			const option: any = {};
			if (options.id) option.id = options.id;
			if (options.categoryId) option.petCategory = options.categoryId;
			return this.petsRepository.find(option);
		} catch (e) {
			throw e
		}
	}

	findMultiplePetCategory(ids: number[]) {
		return this.petCategoriesRepository.find({
			id: { $in: ids }
		});
	}

	async updatePet(id: number, updatePetDto: UpdatePetDto) {
		const pet = await this.findOnePet(id);
		const updatedPet = wrap(pet).assign({
			...updatePetDto
		});
		await this.em.persistAndFlush(updatedPet);
		return updatedPet;
	}

	async deletePet(id: number) {
		const pet = await this.findOnePet(id);
		await this.petsRepository.removeAndFlush(pet);
	}
}
