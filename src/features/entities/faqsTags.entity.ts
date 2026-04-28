import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {TagsEntity} from "./tags.entity";
import {FaqsEntity} from "./faqs.entity";

@Entity('faqsTags')
export class FaqsTagsEntity extends BaseModule{
    @Column({type: 'int'})
    faqsId!: number

    @Column({type: 'int'})
    tagId!: number

    @ManyToOne(() => TagsEntity, (tag) => tag.faqsTags)
    @JoinColumn({name: 'faqsId'})
    faq!: FaqsEntity

    @ManyToOne(() => TagsEntity, (tag) => tag.faqsTags)
    @JoinColumn({name: 'tagId'})
    tag!: TagsEntity
}