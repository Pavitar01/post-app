import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/domain/user/user.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @Column({ type: 'varchar', length: 255, nullable: true })
    category: string;

    @Column({ array: true, type: 'varchar', nullable: true })
    tags: string[];

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'int', default: 0 })
    likes: number;

    @CreateDateColumn()
    createdAt: Date;
}
