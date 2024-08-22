import { Controller, Get, Post, Body, Patch, Param, Delete, BadGatewayException, UnprocessableEntityException } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { CreateApplicationDto } from './dto/create-application.dto';


@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contact-us')
  createContactUs(@Body() createContactUsFormDto: CreateContactUsFormDto) {
    try {
      return this.formsService.createContactUs(createContactUsFormDto);
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

  @Post('volunteer-applications')
  createVolunteer(@Body() createVolunteerDto: CreateVolunteerDto) {
    try {
      return this.formsService.createVolunteer(createVolunteerDto);
    } catch (e) {
      return new BadGatewayException(e);
    }
  }
  
  @Post('pets-applications')
  async createApplications(@Body() createApplicationDto: CreateApplicationDto) {
    try{
      switch(true) {
        case("adoptPet" in createApplicationDto && createApplicationDto?.adoptPet?.length > 0): {
          return this.formsService.createPetAdoption(createApplicationDto)
        }
        case("fosterPetTypeId" in createApplicationDto && createApplicationDto.fosterPetTypeId.length > 0): {
          return await this.formsService.createPetFoster(createApplicationDto)
        }
        default: {
          return new UnprocessableEntityException()
        }
      }
    } catch(e) {
      console.log(e)

    }
  }

  @Get('foster/:id')
  async findOnePetFoster(@Param('id') id: number) {
    try{
    return this.formsService.findOnePetFoster(id);
    } catch(e) {

    }

  }



  // @Get()
  // findAll() {
  //   return this.formsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.formsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
  //   return this.formsService.update(+id, updateFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.formsService.remove(+id);
  // }
}
