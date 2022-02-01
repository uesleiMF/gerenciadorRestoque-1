import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 150)
  @ApiProperty()
  email: string;

 
}
