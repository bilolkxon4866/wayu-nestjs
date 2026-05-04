import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {FaqsTagsEntity} from "../faqs-tags/faqsTags.entity";

@Entity('faqs')
export class FaqsEntity extends BaseModule{
    @Column({type: 'varchar', length: 256})
    question!: string

    @Column({type: 'varchar', length: 512})
    answer!: string

    @OneToMany(() => FaqsTagsEntity, (faqstag) => faqstag.faq)
    faqsTags!: FaqsTagsEntity[]

}