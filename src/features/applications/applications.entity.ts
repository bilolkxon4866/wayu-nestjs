import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {ApplicationStatus} from "../../core/enum/enum";
import {VacanciesEntity} from "../vacancies/vacancies.entity";

@Entity('applications')
export class ApplicationsEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    fullName!: string

    @Column({type: 'varchar', length: 16})
    phoneNumber!: string

    @Column({type: 'varchar', length: 64})
    email!: string

    @Column({type: 'int'})
    vacancyId!: number

    @Column({type: 'varchar', length: 128})
    resume!: string

    @Column({type: 'enum', enum: ApplicationStatus, default: 'active'})
    status!: ApplicationStatus

    @ManyToOne(() => VacanciesEntity, (vacancy) => vacancy.applications)
    @JoinColumn({name: 'vacancyId'})
    vacancy!: VacanciesEntity
}