import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags("Test")
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
