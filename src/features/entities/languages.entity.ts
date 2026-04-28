import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";

@Entity('languages')
export class LanguagesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    title!: string
}