
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {TagsEntity} from "./tags.entity";
import {NewsEntity} from "../news/news/news.entity";

@Entity('newsTags')
export class NewsTagsEntity extends BaseModule{
    @Column({type: 'int'})
    newsId!: number

    @Column({type: 'int'})
    tagId!: number

    @ManyToOne(() => NewsEntity, (news) => news.newstag)
    @JoinColumn({name: 'newsId'})
    news!: NewsEntity

    @ManyToOne(() => TagsEntity, (tag) => tag.newstag)
    @JoinColumn({name: 'tagId'})
    tag!: TagsEntity
}