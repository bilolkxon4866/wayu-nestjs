import {Column, Entity, OneToMany} from "typeorm";
import {NewsTagsEntity} from "./newstags.entity";
import {FaqsTagsEntity} from "./faqsTags.entity";
import {BaseModule} from "../../core/base-module";

@Entity('tags')
export class TagsEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string

    @OneToMany(() => NewsTagsEntity, (newstag) => newstag.tag)
    newstag!: NewsTagsEntity[]

    @OneToMany(() => FaqsTagsEntity, (faqsTag) => faqsTag.tag)
    faqsTags!: FaqsTagsEntity[]
}