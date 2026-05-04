import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModule } from '../../../core/base-module';
import { NewsCategoriesEntity } from '../news-category/newsCategories.entity';
import { CountriesEntity } from '../../countries/countries.entity';
import {NewsTagsEntity} from "../../news-tags/newstags.entity";

@Entity('news')
export class NewsEntity extends BaseModule {
    @Column({ type: 'varchar', length: 256 })
    title!: string;

    @Column({ type: 'varchar', length: 128 })
    image!: string;

    @Column({ type: 'timestamp' })
    date!: Date;

    @Column({ type: 'text' })
    content!: string;

    @Column()
    categoryId!: number;

    @ManyToOne(() => NewsCategoriesEntity, (newsCategory) => newsCategory.news)
    @JoinColumn({ name: 'categoryId' })
    newsCategory!: NewsCategoriesEntity;

    @ManyToOne(() => CountriesEntity, (country) => country.news, { nullable: true })
    @JoinColumn({ name: 'countryId' })
    country?: CountriesEntity;

    @OneToMany(() => NewsTagsEntity, (newsTag) => newsTag.news)
    newstag!: NewsTagsEntity[];
}
