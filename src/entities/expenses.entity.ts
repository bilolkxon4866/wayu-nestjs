import {Column, Entity} from "typeorm";
import {BaseModule} from "../core/base-module";

@Entity('expenses')
export class ExpensesEntity extends BaseModule{
    @Column({type: 'decimal', precision: 10, scale: 2})
    amount!: number

    @Column({type: 'timestamp'})
    date!: Date

    @Column({type: 'varchar', length: 256})
    title!: string

    @Column({type: 'text', nullable: true})
    description?: string

    @Column({type: 'varchar', length: 64})
    transactionId!: string
}