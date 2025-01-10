import { DeleteObjectCommand, ListBucketsCommand, PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import EFileDirectory from '../../common/enums/s3FileDirectory';
import EPromiseResult from '../../common/enums/nodePromiseResult';
import PromiseResult from '../../common/classes/PromiseResult';

type TBucketName = "pet-save-local" | "pet-save-production";

@Injectable()
export class S3Service {
    private s3Client: S3Client;
    private bucketName: TBucketName

    constructor(
        private configService: ConfigService,
    ) {
        let credential: S3ClientConfig = {
            region: this.configService.get('AWS_REGION'),
            credentials: undefined
        };
        let name: TBucketName = "pet-save-production";

        const env = this.configService.get('ENV');
        if (env === 'local') {
            name = "pet-save-local";
            credential.credentials = fromSSO({ profile: process.env.AWS_PROFILE })
        }

        this.s3Client = new S3Client(credential);
        this.bucketName = name;
    }

    async listBucket(path: string) {
        const params = {};
        const command = new ListBucketsCommand(params);
        const data = await this.s3Client.send(command);
        return data
    }

    async uploadImages(
        type: EFileDirectory,
        id: number,
        images: Express.Multer.File[],
    ) {
        const uploads = images.map((image) => {
            const { mimetype, originalname } = image;
            const location = [
                type,
                id,
                uuidv4()
            ].join('/');
            return ({
                promise: this.s3Client.send(
                    new PutObjectCommand({
                        Bucket: this.bucketName,
                        Key: location,
                        Body: image.buffer,
                        ContentType: mimetype
                    })
                ),
                originalname,
                key: location
            })
        });
        const concurrentPromise = Promise.allSettled(uploads);
        const s3Objects = await concurrentPromise;
		const result = new PromiseResult();

        s3Objects.forEach((object, index) => {
            const { status } = object
            if(status === EPromiseResult.REJECTED) {
                const { originalname } = uploads[index];
                const { reason } = object;
                result.setRejected({ originalname, reason })
            } else {
                const { value: { key } } = object;
                result.setFullfilled(key)
            }
        })
        return result;
    }

    async deleteImage(location: string) {
        const result = await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: location,
            }
        ));
        return result;
    }
}
