import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class archieveDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isArchieve: boolean;
}
