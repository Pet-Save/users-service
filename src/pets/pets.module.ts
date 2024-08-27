import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PetCategories } from './entities/pet-categories.entity';
import { Gender } from '../settings/entities/gender.entity';
import { Pets } from './entities/pets.entity';
import { PetImages } from './entities/pet-images.entity';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      PetCategories,
      Gender,
      Pets,
      PetImages,
    ]),
    SettingsModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [
    PetsService,
  ]
})
export class PetsModule {}
