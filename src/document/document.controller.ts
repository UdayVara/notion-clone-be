import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthGuard } from 'src/user/guards/authGuards';
import { updateDocument } from './dto/updateDocument.dto';
import { archieveDocumentDto } from './dto/archieve.dto';

@UseGuards(AuthGuard)
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('/')
  async createDocument(
    @Req() req: any,
    @Body() data: { parentDocument?: string },
  ) {
    return this.documentService.createDocument(
      data.parentDocument,
      req.user?.id,
    );
  }

  @Get('/')
  async getDocument(@Req() req: any) {
    console.log(req.query.searchTerm);
    return this.documentService.getDocument(
      req.user?.id,
      req.query.searchTerm || '',
      req.query.getRaw || false,
    );
  }
  @Get('/archives')
  async getArchivedDocument(@Req() req: any) {
    return this.documentService.getArchieves(req.user?.id);
  }

  @Get('/:id')
  async getDocumentWithID(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentService.getDocumentById(id);
  }

  @Put('/:id')
  async updateDocument(
    @Param('id', ParseUUIDPipe) document: any,
    @Body() data: updateDocument,
  ) {
    return this.documentService.updateDocument(document, data);
  }

  @Put('/save/:id')
  async saveChange(
    @Param('id', ParseUUIDPipe) document: any,
    @Body() data: { content: any[] },
  ) {
    return this.documentService.setContent(document, data.content);
  }

  @Put('/rename/:id')
  async rename(
    @Param('id', ParseUUIDPipe) document: any,
    @Body() data: { title: string },
  ) {
    return this.documentService.rename(document, data.title);
  }

  @Delete('/:id')
  async deleteDocument(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentService.deleteDocument(id);
  }

  @Post('/archieve/:id')
  async updateArchieve(
    @Param('id', ParseUUIDPipe) id,
    @Body() data: archieveDocumentDto,
  ) {
    return this.documentService.updateArchieve(id, data.isArchieve);
  }
}
