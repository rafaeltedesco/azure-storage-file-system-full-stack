import { Controller, Get, Res } from '@nestjs/common';
import { ListContainerService } from '../providers/listContainers.service';
import { Response } from 'express';
import { mapHttpStatusCode } from 'src/shared/mappers/httpStatusCodeMapper';

@Controller('blobs')
export class ListContainersController {
  constructor(private readonly listContainerService: ListContainerService) {}

  @Get('list-containers')
  public async listContainers(@Res() res: Response) {
    const { status, data } = await this.listContainerService.listContainers();
    return res.status(mapHttpStatusCode(status)).json(data);
  }
}
