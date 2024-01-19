import { BlobServiceClient, ContainerItem } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { AzureAuthProvider } from 'src/authenticators/providers/auth.service';
import {
  ContainerClientDTO,
  ServiceResponseOrError,
} from 'src/shared/types/serviceResponse';

import {
  ServiceResponseErrorStatus,
  ServiceResponseSuccessStatus,
} from 'src/shared/enums/serviceResponseEnum';

@Injectable()
export class ContainerClientService {
  private readonly azureClient: BlobServiceClient;

  constructor(private azureAuthProvider: AzureAuthProvider) {
    this.azureClient = this.azureAuthProvider.getClient();
  }

  public async getContainerByName(
    containerName: string,
  ): Promise<ServiceResponseOrError<ContainerClientDTO>> {
    const containerClient = this.azureClient.getContainerClient(containerName);
    const exists = await containerClient.exists();
    if (!exists) {
      return {
        status: ServiceResponseErrorStatus.INVALID_DATA,
        data: {
          error: `Container ${containerName} does not exist`,
        },
      };
    }
    return {
      status: ServiceResponseSuccessStatus.OK,
      data: {
        containerClient,
      },
    };
  }

  public async createContainer(containerName: string) {
    await this.azureClient.createContainer(containerName);
  }

  public async listContainers(): Promise<ContainerItem[]> {
    const containers: ContainerItem[] = [];
    for await (const container of this.azureClient.listContainers()) {
      containers.push(container);
    }
    return containers;
  }
}
