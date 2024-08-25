import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { PetCategories } from './entities/pet_categories.entity';
import { Gender } from '../settings/entities/gender.entity';
import { Pets } from './entities/pets.entity';
import { PetImages } from './entities/pet_images.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      PetCategories,
      Gender,
      Pets,
      PetImages,
    ]),
    CacheModule.register()
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [
    PetsService,
  ]
})
export class PetsModule {}
