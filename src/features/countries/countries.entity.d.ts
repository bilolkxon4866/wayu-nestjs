import { BaseModule } from "../../core/base-module";
import { NewsEntity } from "../news/news/news.entity";
import { BranchesEntity } from "../../../../wayu2/src/features/branches/branches.entity";
export declare class CountriesEntity extends BaseModule {
    title: string;
    flag: string;
    news: NewsEntity[];
    branches: BranchesEntity[];
}
