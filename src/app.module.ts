import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsModule} from "./features/news/news.module";
import {ApplicationsModule} from "./features/applications/applications.module";
import {AuthorModule} from "./features/author/author.module";
import {BooksModule} from "./features/books/books.module";
import {BookCategoriesModule} from "./features/book-categories/book-categories.module";
import {BranchesModule} from "./features/branches/branch.module";
import {CountriesModule} from "./features/countries/countries.module";
import {EventModule} from "./features/event/event.module";
import {RepresentativesModule} from "./features/representatives/representatives.module";
import {SocialLinksModule} from "./features/social-links/social-links.module";
import {UsefulLinkModule} from "./features/useful-link/useful-link.module";
import {VacanciesModule} from "./features/vacancies/vacancies.module";
import {FaqsModule} from "./features/faqs/faqs.module";
import {InstagramPostsModule} from "./features/instagram-posts/instagram-posts.module";
import {TagsModule} from "./features/tags/tags.module";
import {StaticInfoModule} from "./features/static-info/static-info.module";
import {LanguagesModule} from "./features/languages/languages.module";
import {EventCategoriesModule} from "./features/eventCategories/event-categories.module";
import {FaqsTagsModule} from "./features/faqs-tags/faqs-tags.module";
import {NewsTagsModule} from "./features/news-tags/news-tags.module";
import {QuestionsModule} from "./features/questions/questions.module";
import {AuthModule} from "./features/authentification/auth.module";
@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      CqrsModule.forRoot(),
      ApplicationsModule,
      AuthModule,
      AuthorModule,
      BookCategoriesModule,
      BooksModule,
      BranchesModule,
      CountriesModule,
      EventModule,
      EventCategoriesModule,
      FaqsModule,
      FaqsTagsModule,
      RepresentativesModule,
      SocialLinksModule,
      UsefulLinkModule,
      VacanciesModule,
      NewsModule,
      NewsTagsModule,
      QuestionsModule,
      InstagramPostsModule,
      TagsModule,
      StaticInfoModule,
      LanguagesModule,


  ],
})
export class AppModule {}
