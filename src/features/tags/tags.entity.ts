import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {NewsTagsEntity} from "../news-tags/newstags.entity";
import {FaqsTagsEntity} from "../faqs-tags/faqsTags.entity";

@Entity('tags')
export class TagsEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string

    @OneToMany(() => NewsTagsEntity, (newstag) => newstag.tag)
    newstag!: NewsTagsEntity[]

    @OneToMany(() => FaqsTagsEntity, (faqsTag) => faqsTag.tag)
    faqsTags!: FaqsTagsEntity[]
}