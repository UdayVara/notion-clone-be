import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [DocumentController],
  providers: [PrismaService,DocumentService],
})
export class DocumentModule {}
