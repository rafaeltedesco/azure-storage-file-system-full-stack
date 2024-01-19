import { Injectable } from '@nestjs/common';
import { sanitizeFilename } from '../utils/sanitizers';
import { Readable } from 'stream';
import { ContainerClient } from '@azure/storage-blob';
import { ContainerClientService } from './containerClient.service';

import {
  ServiceResponseErrorStatus,
  ServiceResponseSuccessStatus,
} from 'src/shared/enums/serviceResponseEnum';

import {
  FileCreated,
  ServiceResponseOrError,
} from 'src/shared/types/serviceResponse';

@Injectable()
export class UploadFileService {
  constructor(private containerClientService: ContainerClientService) {}

  public async uploadFilesToBlobContainer(
    files: Array<Express.Multer.File>,
    containerName: string,
  ): Promise<ServiceResponseOrError<FileCreated[]>> {
    const result =
      await this.containerClientService.getContainerByName(containerName);
    if (result.status === ServiceResponseErrorStatus.INVALID_DATA) {
      return result;
    }
    const response = await Promise.all(
      files.map((file) => this.uploadStream(file, result.data.containerClient)),
    );

    return {
      status: ServiceResponseSuccessStatus.CREATED,
      data: response,
    };
  }

  private async uploadStream(
    file: Express.Multer.File,
    containerClient: ContainerClient,
  ): Promise<FileCreated> {
    const { originalname, buffer } = file;
    const filename = sanitizeFilename(originalname);

    const blobClient = containerClient.getBlockBlobClient(filename);

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const res = await blobClient.uploadStream(stream, buffer.length);

    return {
      requestId: res.requestId,
      filename,
    };
  }
}
