import { Body, Controller, Post, Res } from '@nestjs/common';
import { ContainerCreationDTO } from 'src/shared/types/serviceResponse';
import { CreateContainerService } from '../providers/createContainer.service';
import { Response } from 'express';
import { mapHttpStatusCode } from 'src/shared/mappers/httpStatusCodeMapper';

@Controller('blobs')
export class CreateContainerController {
  constructor(
    private readonly createContainerService: CreateContainerService,
  ) {}

  @Post('create-container')
  public async createContainer(
    @Res() res: Response,
    @Body() containerDTO: ContainerCreationDTO,
  ) {
    const { status, data } =
      await this.createContainerService.createContainer(containerDTO);
    return res.status(mapHttpStatusCode(status)).json(data);
  }
}
