import { AbstractEntity, Role } from '@app/common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
