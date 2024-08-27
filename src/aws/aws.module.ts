import { Module } from '@nestjs/common';
import { SesService } from './ses/ses.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SesService],
  exports: [
    SesService,
  ]
})
export class AwsModule {
}
