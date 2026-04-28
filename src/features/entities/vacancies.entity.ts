import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {VacancyType} from "../../core/enum/enum";
import {ApplicationsEntity} from "./applications.entity";

@Entity('vacancies')
export class VacanciesEntity extends BaseModule{
    @Column({type: 'varchar', length: 256})
    title!: string

    @Column({type: 'varchar', length: 128})
    address!: string

    @Column({type: 'text'})
    description!: string

    @Column({type: 'varchar', length: 16})
    phoneNumber!: string

    @Column({type: 'enum', enum: VacancyType})
    type!: VacancyType

    @Column({type: 'varchar', length: 64})
    salary!: string

    @Column({type: 'boolean', default: true})
    isActive!: boolean

    @OneToMany(() => ApplicationsEntity, (application) => application.vacancy)
    applications!: ApplicationsEntity[]
}
