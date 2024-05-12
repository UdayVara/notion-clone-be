import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsAlphanumeric()
  password: string;

  @IsString()
  bio: string;
}
