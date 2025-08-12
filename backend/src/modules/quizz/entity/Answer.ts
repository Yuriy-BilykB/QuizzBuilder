import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './Question';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    answer: string;
    
    @Column()
    isCorrect: boolean;
    
    @ManyToOne(() => Question, question => question.answers)
    @JoinColumn({ name: 'questionId' })
    question: Question;
    
    @Column()
    questionId: number;
}