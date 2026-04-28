import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";
import {CqrsModule} from "@nestjs/cqrs";
import {NewsModule} from "./features/news/news.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      CqrsModule.forRoot(),
      NewsModule,
  ],
})
export class AppModule {}
