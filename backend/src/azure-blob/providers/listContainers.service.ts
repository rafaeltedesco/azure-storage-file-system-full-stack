import { Injectable } from '@nestjs/common';
import { ContainerClientService } from './containerClient.service';
import {
  ListContainersOutputDTO,
  ServiceResponseOrError,
} from 'src/shared/types/serviceResponse';
import { ServiceResponseSuccessStatus } from 'src/shared/enums/serviceResponseEnum';

@Injectable()
export class ListContainerService {
  constructor(private readonly containerClient: ContainerClientService) {}

  public async listContainers(): Promise<
    ServiceResponseOrError<ListContainersOutputDTO>
  > {
    const containers = await this.containerClient.listContainers();
    const response = containers.map((container) => {
      return {
        containerName: container.name,
      };
    });
    return {
      status: ServiceResponseSuccessStatus.OK,
      data: {
        containers: response,
      },
    };
  }
}
