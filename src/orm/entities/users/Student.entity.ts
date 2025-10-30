import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Parent } from './Parent.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  @ManyToOne(() => Parent, (parent) => parent.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;
}
