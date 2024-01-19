import { Module } from '@nestjs/common';
import { AzureAuthModule } from 'src/authenticators';
import { UploadFilesController } from './controllers/uploadFiles.controller';
import { UploadFileService } from './providers/uploadFiles.service';
import { ContainerClientService } from './providers/containerClient.service';
import { ListFilesController } from './controllers/listFiles.controller';
import { ListFilesService } from './providers/listFiles.service';
import { CreateContainerController } from './controllers/createContainer.controller';
import { CreateContainerService } from './providers/createContainer.service';
import { ListContainersController } from './controllers/listContainers.controller';
import { ListContainerService } from './providers/listContainers.service';

@Module({
  imports: [AzureAuthModule],
  controllers: [
    UploadFilesController,
    ListFilesController,
    CreateContainerController,
    ListContainersController,
  ],
  providers: [
    UploadFileService,
    ContainerClientService,
    ListFilesService,
    CreateContainerService,
    ListContainerService,
  ],
})
export default class AzureBlobModule {}
