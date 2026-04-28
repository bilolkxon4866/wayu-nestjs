import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class BaseModule extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updateAt?: string
}