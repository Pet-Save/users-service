import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-contact-us-form.dto';

export class UpdateFormDto extends PartialType(CreateFormDto) {}
