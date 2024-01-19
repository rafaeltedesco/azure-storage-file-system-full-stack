import { Injectable } from '@nestjs/common';
import { ContainerClientService } from './containerClient.service';
import {
  ServiceResponseErrorStatus,
  ServiceResponseSuccessStatus,
} from 'src/shared/enums/serviceResponseEnum';
import {
  BlobDTO,
  ServiceResponseOrError,
} from 'src/shared/types/serviceResponse';

@Injectable()
export class ListFilesService {
  constructor(private containerClientService: ContainerClientService) {}

  public async listBlobsFromContainer(
    containerName: string,
  ): Promise<ServiceResponseOrError<BlobDTO[]>> {
    const blobs: BlobDTO[] = [];
    const result =
      await this.containerClientService.getContainerByName(containerName);
    if (result.status === ServiceResponseErrorStatus.INVALID_DATA) {
      return result;
    }
    for await (const blob of result.data.containerClient.listBlobsByHierarchy(
      '/',
    )) {
      blobs.push({ name: blob.name });
    }
    return {
      status: ServiceResponseSuccessStatus.OK,
      data: blobs,
    };
  }
}
