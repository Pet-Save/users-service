import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ContactUsForm } from './entities/contact-use-form.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([ContactUsForm]),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
