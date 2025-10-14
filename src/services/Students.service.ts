import { getRepository } from 'typeorm';

import { CreateStudentDto, UpdateStudentDto } from 'dtos/student.dto';
import { Student } from 'orm/entities/users/Student.entity';
export class StudentService {
  private studentRepo = getRepository(Student);

  async create(data: CreateStudentDto) {
    const student = this.studentRepo.create(data);
    return this.studentRepo.save(student);
  }

  async findAll() {
    return this.studentRepo.find({ relations: ['parent'] });
  }

  async findOne(id: number) {
    return this.studentRepo.findOne(id, { relations: ['parent'] });
  }

  async update(id: number, data: UpdateStudentDto) {
    await this.studentRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.studentRepo.delete(id);
  }
}
