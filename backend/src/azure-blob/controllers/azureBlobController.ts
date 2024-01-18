import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AzureAuthProvider } from 'src/authenticators/providers/auth.service';
import { Readable } from 'stream';
import { sanitizeFilename } from '../utils/sanitizers';

@Controller('blobs')
export class AzureBlobController {
  private azureClient: BlobServiceClient;
  private containerName = 'images';
  private containerClient: ContainerClient;

  constructor(private azureAuthProvider: AzureAuthProvider) {
    this.azureClient = this.azureAuthProvider.getClient();
    this.containerClient = this.azureClient.getContainerClient(
      this.containerName,
    );
  }

  @Post('upload/images')
  @UseInterceptors(AnyFilesInterceptor())
  public async uploadToblob(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    for (const file of files) {
      const { originalname, buffer } = file;
      const filename = sanitizeFilename(originalname);

      const blobClient = this.containerClient.getBlockBlobClient(filename);

      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      const res = await blobClient.uploadStream(stream, buffer.length);
      response.push({
        requestId: res.requestId,
        filename,
      });
    }

    return { data: { files: response } };
  }

  @Get('list-files')
  public async listFilesFromContainer(): Promise<string[]> {
    const blobs = [];
    for await (const blob of this.containerClient.listBlobsByHierarchy('/')) {
      blobs.push({ name: blob.name });
    }
    return blobs;
  }

  @Get('list-containers')
  public async listContainers(): Promise<string[]> {
    const containers: Array<string> = [];
    for await (const container of this.azureClient.listContainers()) {
      containers.push(container.name);
    }
    return containers;
  }
}
