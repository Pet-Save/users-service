import { Module } from '@nestjs/common';
import { SesService } from './ses/ses.service';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [ConfigModule],
  providers: [SesService, S3Service],
  exports: [
    SesService,
    S3Service
  ]
})

export class AwsModule {
}
