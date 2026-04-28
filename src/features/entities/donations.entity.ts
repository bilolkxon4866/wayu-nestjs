import {BaseModule} from "../../core/base-module";
import {Column, Entity} from "typeorm";
import {PaymentProvider} from "../../core/enum/enum";

@Entity('donations')
export class DonationsEntity extends BaseModule{
    @Column({type: 'decimal', precision: 10, scale: 2})
    amount!: number

    @Column({type: 'varchar', length: 64})
    fullname!: string

    @Column({type: 'timestamp'})
    date!: Date

    @Column({type: 'enum', enum: PaymentProvider})
    paidby!: PaymentProvider
}