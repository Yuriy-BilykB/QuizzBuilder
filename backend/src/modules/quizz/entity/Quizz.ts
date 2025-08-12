import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';

@Entity()
export class Quizz {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @OneToMany(() => Question, question => question.quizz, { cascade: true })
    questions: Question[];
}