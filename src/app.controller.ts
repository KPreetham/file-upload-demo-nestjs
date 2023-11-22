import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Received');
    console.log(file);

    await fs.writeFileSync(file.originalname, file.buffer);

    return {
      status: 'success',
      message: 'File uploaded',
      data: {
        file: file.originalname,
        type: file.mimetype,
        size: file.size,
      },
    };
  }
}
