import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";

@Entity('sociallinks')
export class SocialLinksEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    title!:string

    @Column({type: 'varchar', length: 128})
    icon!: string

    @Column({type: 'varchar', length: 128})
    link!: string
}
