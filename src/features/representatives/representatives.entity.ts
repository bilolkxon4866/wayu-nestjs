import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {BranchesEntity} from "../branches/branches.entity";

@Entity('representatives')
export class RepresentativesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    fullname!: string

    @Column({type: 'varchar', length: 128})
    image!: string

    @Column({type: 'varchar', length: 64})
    email!: string

    @Column({type: 'varchar', length: 16})
    phoneNumber!: string

    @Column({type: 'text', })
    resume!: string

    @OneToMany(() => BranchesEntity, (branch) => branch.country)
    branches!: BranchesEntity[]
}