import { Injectable } from '@nestjs/common';
import { CreateContactUsFormDto, CreateFormDto } from './dto/create-contact-us-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ContactUsForm } from './entities/contact-use-form.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(ContactUsForm)
    private readonly contactUsFormRepository: EntityRepository<ContactUsForm>,
    private readonly orm: MikroORM,
  ) {}

  async createContactUsForm(createContactUsFormDto: CreateContactUsFormDto) {
    try {
      const contactUsForm = new ContactUsForm(createContactUsFormDto);
      const em = this.orm.em.fork();
      await em.persist(contactUsForm).flush();
      return contactUsForm
    } catch(e) {
      return e
    }
  }

  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  findAll() {
    return `This action returns all forms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
