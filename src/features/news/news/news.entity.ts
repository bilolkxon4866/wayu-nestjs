import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseModule} from "../../../core/base-module";
import {NewsCategoriesEntity} from "../news-category/newsCategories.entity";
import {CountriesEntity} from "../../entities/countries.entity";
import {NewsTagsEntity} from "../../entities/newstags.entity";

@Entity('news')
export class NewsEntity extends BaseModule{
    @Column({type: 'varchar', length: 256})
    title!: string

    @Column({type: 'varchar', length: 128})
    image!: string

    @Column({type: 'timestamp'})
    date!: Date

    @Column({type: 'text'})
    content!: string

    @ManyToOne(() => NewsCategoriesEntity, (newscategory) => newscategory.news)
    @JoinColumn({name: 'newsCategoryId'})
    newsCategory!: NewsCategoriesEntity

    @ManyToOne(() => CountriesEntity, (country) => country.news, {nullable: true})
    @JoinColumn({name: 'countryId'})
    country?: CountriesEntity

    @OneToMany(() => NewsTagsEntity, (newstag) => newstag.news)
    newstag: NewsTagsEntity[]
}