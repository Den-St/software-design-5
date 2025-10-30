import { IsString, IsDateString, IsOptional, IsInt, IsArray } from 'class-validator';

import { Student } from '../orm/entities/users/Student.entity';

export class StudentResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  parentId: number;

  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.first_name;
    this.lastName = student.last_name;
    this.birthDate = student.birth_date.toString();
    this.phone = student.phone;
    this.parentId = student.parent?.id ?? 0;
  }
}

export class CreateStudentDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsDateString()
  birth_date: string;

  @IsString()
  phone: string;

  @IsInt()
  parent_id: number;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  parent_id?: number;
}

export class AssignParentDto {
  @IsArray()
  @IsInt({ each: true })
  studentIds: number[];

  @IsInt()
  parentId: number;
}
