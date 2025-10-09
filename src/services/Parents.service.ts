import { getRepository } from 'typeorm';

import { Parent } from 'orm/entities/users/Parent.entity';

import { CreateParentDto, UpdateParentDto } from '../dtos/parent.dto';

export class ParentService {
  private parentRepo = getRepository(Parent);

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
    return this.parentRepo.delete(id);
  }
}
