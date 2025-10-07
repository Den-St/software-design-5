import { getRepository } from 'typeorm';

import { Parent } from 'orm/entities/users/Parent.entity';

export class ParentsService {
  private repo = getRepository(Parent);

  findAll() {
    return this.repo.find({ relations: ['children'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['children'] });
  }

  create(data: Partial<Parent>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  update(id: number, data: Partial<Parent>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
