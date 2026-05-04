import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {EventCategoriesEntity} from "../eventCategories/eventCategories.entity";

@Entity('event')
export class EventEntity extends BaseModule{
    @Column({type: 'varchar', length: 256})
    title!: string

    @Column({type: 'text'})
    content!: string

    @Column({type: 'varchar', length: 128})
    image!: string

    @Column({type: 'timestamp'})
    date!: Date

    @Column({type: 'varchar', length: 128})
    address!: string

    @ManyToOne(() => EventCategoriesEntity, (category) => category.event)
    @JoinColumn({name: 'eventcategoryId'})
    category!: EventCategoriesEntity
}