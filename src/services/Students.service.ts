import { getRepository } from 'typeorm';

import { Student } from 'orm/entities/users/Student.entity';

export class StudentsService {
  private repo = getRepository(Student);

  findAll() {
    return this.repo.find({ relations: ['parent'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['parent'] });
  }

  create(data: Partial<Student>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  update(id: number, data: Partial<Student>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
