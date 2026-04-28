import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../../core/base-module";
import {NewsEntity} from "../news/news.entity";

@Entity('newsCategories')
export class NewsCategoriesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string

    @OneToMany(() => NewsEntity, (news) => news.newsCategory)
    news!: NewsEntity[]
}