import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";

@Entity('usefullink')
export class UsefulLinkEntity extends BaseModule{
    @Column({type: 'varchar', length: 128})
    title!:string

    @Column({type: 'varchar', length: 128})
    icon!: string

    @Column({type: 'varchar', length: 128})
    link!: string
}
