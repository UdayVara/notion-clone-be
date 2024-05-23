import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  password: string;


}
