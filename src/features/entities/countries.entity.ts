import {BaseModule} from "../../core/base-module";
import {Column, Entity, OneToMany} from "typeorm";
import {NewsEntity} from "../news/news/news.entity";
import {BranchesEntity} from "./branches.entity";

@Entity('countries')
export class CountriesEntity extends BaseModule{
    @Column({type: 'varchar', length:64, unique: true})
    title!: string

    @Column({type: 'varchar', length: 64})
    flag!: string

    @OneToMany(() => NewsEntity, (news) => news.country)
    news!: NewsEntity[]

    @OneToMany(() => BranchesEntity, (branch) => branch.country)
    branches!: BranchesEntity[]
}