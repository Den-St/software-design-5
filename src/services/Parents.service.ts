import { getRepository } from 'typeorm';

import { Parent } from 'orm/entities/users/Parent.entity';
import { Student } from 'orm/entities/users/Student.entity';

import { CreateParentDto, UpdateParentDto } from '../dtos/parent.dto';

export class ParentService {
  private parentRepo = getRepository(Parent);
  private studentRepo = getRepository(Student);

  async create(data: CreateParentDto) {
    const parent = this.parentRepo.create(data);
    return this.parentRepo.save(parent);
  }

  async findAll() {
    return this.parentRepo.find({ relations: ['children'] });
  }

  async findOne(id: number) {
    return this.parentRepo.findOne(id, { relations: ['children'] });
  }

  async update(id: number, data: UpdateParentDto) {
    await this.parentRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const students = await this.studentRepo.find({ where: { parent: id } });

    for (const student of students) {
      student.parent = null;
      await this.studentRepo.save(student);
    }

    return this.parentRepo.delete(id);
  }
}
