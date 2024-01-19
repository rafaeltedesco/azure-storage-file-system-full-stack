import { Injectable } from '@nestjs/common';
import { ContainerClientService } from './containerClient.service';
import {
  ContainerCreationDTO,
  ServiceResponseOrError,
} from 'src/shared/types/serviceResponse';
import { ServiceResponseSuccessStatus } from 'src/shared/enums/serviceResponseEnum';

@Injectable()
export class CreateContainerService {
  constructor(private readonly containerClient: ContainerClientService) {}

  public async createContainer(
    containerDTO: ContainerCreationDTO,
  ): Promise<ServiceResponseOrError<ContainerCreationDTO>> {
    await this.containerClient.createContainer(containerDTO.containerName);

    return {
      status: ServiceResponseSuccessStatus.CREATED,
      data: {
        containerName: containerDTO.containerName,
      },
    };
  }
}
