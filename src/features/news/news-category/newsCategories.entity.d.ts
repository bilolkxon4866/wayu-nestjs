import { BaseModule } from '../../../core/base-module';
import { NewsEntity } from '../news/news.entity';
export declare class NewsCategoriesEntity extends BaseModule {
    title: string;
    news: NewsEntity[];
}
