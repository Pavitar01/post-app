import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Generated } from 'typeorm';
import { Role } from './enums/role';
import { Post } from '../post/Post.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, generated: 'uuid' })
    uuid: string;

    @Column()
    name: string;

    @Column({ unique: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: 'user' })
    role: Role;

    @Column()
    address: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

}
