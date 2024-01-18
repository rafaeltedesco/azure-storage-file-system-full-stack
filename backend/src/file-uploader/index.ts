import { Module } from '@nestjs/common';
import { FileUploaderController } from './controllers/fileUploader.controller';
import { AzureAuthModule } from 'src/authenticators';

@Module({
  imports: [AzureAuthModule],
  controllers: [FileUploaderController],
})
export default class FileUploaderModule {}
