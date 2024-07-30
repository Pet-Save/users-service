import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CreatePetFormDto } from './dto/create-pet-application-form.dto';
import { CreateVolunteerApplicationFormDto } from './dto/create-volunteer-application-form.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contact-us')
  createContactUs(@Body() createContactUsFormDto: CreateContactUsFormDto) {
    try {
      return this.formsService.createContactUsForm(createContactUsFormDto);
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

  @Post('volunteer-applications')
  createVolunteer(@Body() createVolunteerApplicationForm: CreateVolunteerApplicationFormDto) {
    try {
      return this.formsService.createVolunteerApplicationForm(createVolunteerApplicationForm);
    } catch (e) {
      return new BadGatewayException(e);
    }
  }
  

  @Post('pets-applications')
  createPets(
    @Body() createFormDto: CreatePetFormDto
  ) {
    try {
      let res = null;
      switch(true) {
        case("adoptPets" in createFormDto): {
          res = this.formsService.createPetAdoptionForm(createFormDto)
          break;
        }
        case("fosterTypes" in createFormDto): {
          break;
  
        }
        default: {
          break;
        }
      }
    } catch(e) {
      return new BadGatewayException(e);
    }
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
