import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Quizz } from './Quizz';
import { Answer } from './Answer';

export enum QuestionType {
    BOOLEAN = 'boolean',
    INPUT = 'input',
    CHECKBOX = 'checkbox'
}

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    question: string;
    
    @Column({
        type: 'enum',
        enum: QuestionType,
        default: QuestionType.BOOLEAN
    })
    type: QuestionType;
    
    @ManyToOne(() => Quizz, quizz => quizz.questions)
    @JoinColumn({ name: 'quizzId' })
    quizz: Quizz;
    
    @Column()
    quizzId: number;
    
    @OneToMany(() => Answer, answer => answer.question, { cascade: true })
    answers: Answer[];
}