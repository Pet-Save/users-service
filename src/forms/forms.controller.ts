import { BadGatewayException, Body, Controller, Get, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { FormsService } from './forms.service';


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
        case("adoptPetId" in createApplicationDto && createApplicationDto?.adoptPetId?.length > 0): {
          console.log('adopt')
          return this.formsService.createPetApplication(createApplicationDto, false)
        }
        case("fosterPetTypeId" in createApplicationDto && createApplicationDto.fosterPetTypeId.length > 0): {
          console.log('foster')
          return await this.formsService.createPetApplication(createApplicationDto, true)
        }
        default: {
          console.log('default')
          throw new UnprocessableEntityException()
        }
      }
    } catch(e) {
      console.log('g')
      throw e
    }
  }

  @Get('foster/:id')
  async findOnePetFoster(@Param('id') id: number) {
    try{
    return this.formsService.findOnePetFoster(id);
    } catch(e) {
      return e
    }
  }
}
