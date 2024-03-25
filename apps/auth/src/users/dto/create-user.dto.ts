import {
  IsStrongPassword,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDto)
  roles?: RoleDto[];
}
