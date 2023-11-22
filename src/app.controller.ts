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

import { v4 as uuidv4 } from 'uuid';

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

    const f = `uploads/${uuidv4()}-${file.originalname}`;
    await fs.writeFileSync(f, file.buffer);

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
