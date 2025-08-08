import { IsEmail, IsEnum } from 'class-validator';

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class AssignRoleDto {
  @IsEmail()
  email: string;

  @IsEnum(RoleType)
  role: RoleType;
}
