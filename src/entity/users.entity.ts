import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../interfaces/users.interface';
import { getRepository } from 'typeorm';
import { Service, Inject } from 'typedi';

@Entity()
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNotEmpty()
  email: string;
  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

@Service()
export class UserModel {
  public users = UserEntity;
  public db = getRepository(this.users);
}

@Service()
export class Injected {
  print() {
    console.log('hii');
  }
}
