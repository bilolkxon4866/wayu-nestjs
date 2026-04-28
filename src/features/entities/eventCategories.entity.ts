import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {EventEntity} from "./event.entity";

@Entity('eventcategories')
export class EventCategoriesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string

    @OneToMany(() => EventEntity, (event) => event.category)
    events!: EventEntity[]
}