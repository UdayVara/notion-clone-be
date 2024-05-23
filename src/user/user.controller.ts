import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { signInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() data: signInDto) {
    return this.userService.signIn(data);
  }
  
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
