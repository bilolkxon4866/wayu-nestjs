import { BaseModule } from '../../../core/base-module';
import { NewsCategoriesEntity } from '../news-category/newsCategories.entity';
import { CountriesEntity } from '../../countries/countries.entity';
import { NewsTagsEntity } from '../../entities/newstags.entity';
export declare class NewsEntity extends BaseModule {
    title: string;
    image: string;
    date: Date;
    content: string;
    categoryId: number;
    newsCategory: NewsCategoriesEntity;
    country?: CountriesEntity;
    newstag: NewsTagsEntity[];
}
