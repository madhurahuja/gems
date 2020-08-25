import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GemType } from './gem-type.enum';
import { User } from 'src/auth/user.entity';

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

  @ManyToOne((type) => User, (user) => user.gems, { eager: false })
  user: User;

  @Column()
  userId: number;
}
