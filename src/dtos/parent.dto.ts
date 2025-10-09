export class CreateParentDto {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export class UpdateParentDto {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}
