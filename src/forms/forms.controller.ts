import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateContactUsFormDto, CreateFormDto } from './dto/create-contact-us-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';


@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contact-us')
  createContactUs(@Body() createContactUsFormDto: CreateContactUsFormDto) {
    try {
      return this.formsService.createContactUsForm(createContactUsFormDto);
    } catch (e) {
      throw new BadGatewayException();
    }
  }
  @Post('volunteer-applications')
  createVolunteer(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }
  @Post('pets-applications')
  createPets(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}
