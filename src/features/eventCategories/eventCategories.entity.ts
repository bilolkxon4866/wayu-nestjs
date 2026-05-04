import {Column, Entity, OneToMany} from "typeorm"
import type {Relation} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {EventEntity} from "../event/event.entity";


@Entity('eventCategories')
export class EventCategoriesEntity extends BaseModule{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>EventEntity,(event)=>event.category)
    event!:Relation <EventEntity>
}
