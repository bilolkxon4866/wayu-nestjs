import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {QuestionStatus} from "../../core/enum/enum";

@Entity('questions')
export class QuestionsEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    fullName!: string

    @Column({type: 'varchar', length: 16})
    phoneNumber!: string

    @Column({type: 'varchar', length: 2000})
    question!: string

    @Column({type: 'enum', enum: QuestionStatus})
    status!: QuestionStatus
}