import { IsOptional, IsInt } from 'class-validator';

export class FindStudentsByParentDto {
  @IsOptional()
  @IsInt()
  parentId?: number;
}
