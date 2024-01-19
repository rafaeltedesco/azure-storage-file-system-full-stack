import {
  Controller,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from '../providers/uploadFiles.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { mapHttpStatusCode } from 'src/shared/mappers/httpStatusCodeMapper';

@Controller('blobs')
export class UploadFilesController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('upload/:containerName')
  @UseInterceptors(AnyFilesInterceptor())
  public async uploadFilesToBlob(
    @Res() res: Response,
    @Param('containerName') containerName: string,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    const { status, data } =
      await this.uploadFileService.uploadFilesToBlobContainer(
        files,
        containerName,
      );
    return res.status(mapHttpStatusCode(status)).json(data);
  }
}
