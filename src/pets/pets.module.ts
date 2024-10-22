import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Gender } from '../settings/entities/gender.entity';
import { SettingsModule } from '../settings/settings.module';
import { PetCategories } from './entities/pet-categories.entity';
import { PetImages } from './entities/pet-images.entity';
import { Pets } from './entities/pets.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      PetCategories,
      Gender,
      Pets,
      PetImages,
    ]),
    SettingsModule,
    JwtModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [
    PetsService,
  ]
})
export class PetsModule {}
