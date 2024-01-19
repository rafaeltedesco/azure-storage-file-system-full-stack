import { Module } from '@nestjs/common';
import { AzureAuthModule } from 'src/authenticators';
import { UploadFilesController } from './controllers/uploadFiles.controller';
import { UploadFileService } from './providers/uploadFiles.service';
import { ContainerClientService } from './providers/containerClient.service';
import { ListFilesController } from './controllers/listFiles.controller';
import { ListFilesService } from './providers/listFiles.service';

@Module({
  imports: [AzureAuthModule],
  controllers: [UploadFilesController, ListFilesController],
  providers: [UploadFileService, ContainerClientService, ListFilesService],
})
export default class AzureBlobModule {}
