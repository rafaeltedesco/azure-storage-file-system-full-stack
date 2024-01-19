import { Controller, Get, Param, Res } from '@nestjs/common';
import { ListFilesService } from '../providers/listFiles.service';
import { Response } from 'express';
import { mapHttpStatusCode } from 'src/shared/mappers/httpStatusCodeMapper';

@Controller('blobs')
export class ListFilesController {
  constructor(private readonly listFilesService: ListFilesService) {}

  @Get('list-files/:containerName')
  public async listBlobsFromContainer(
    @Res() res: Response,
    @Param('containerName') containerName: string,
  ) {
    const { status, data } =
      await this.listFilesService.listBlobsFromContainer(containerName);
    return res.status(mapHttpStatusCode(status)).json(data);
  }
}
