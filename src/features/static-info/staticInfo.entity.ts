import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";

@Entity('staticInfo')
export class StaticInfoEntity extends BaseModule{
    @Column({type: 'varchar', length: 128, nullable: true})
    appStoreLink?: string

    @Column({type: 'varchar', length: 128, nullable: true})
    playMarketLink?: string

    @Column({type: 'text'})
    aboutUs!: string
}