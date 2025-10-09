export class CreateStudentDto {
  first_name: string;
  last_name: string;
  birth_date: string; // або Date
  phone: string;
  parent_id: number;
}

export class UpdateStudentDto {
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  phone?: string;
  parent_id?: number;
}
