import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ContactUsForm } from './entities/contact-use-form.entity';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([ContactUsForm]),
    SettingsModule
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
