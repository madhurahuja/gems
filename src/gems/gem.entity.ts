import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GemType } from './gem-type.enum';

@Entity()
export class Gem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: GemType;

  @Column()
  description: string;

  @Column()
  imageUrl: string;
}
