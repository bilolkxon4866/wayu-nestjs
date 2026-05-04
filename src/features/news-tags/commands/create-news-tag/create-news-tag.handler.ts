import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateNewsTagCommand } from './create-news-tag.command';
import { CreateNewsTagResponse } from './create-news-tag.response'
import {TagsEntity} from "../../../tags/tags.entity";
import {NewsTagsEntity} from "../../newstags.entity";
import {NewsEntity} from "../../../news/news/news.entity";

@CommandHandler(CreateNewsTagCommand)
export class CreateNewsTagHandler implements ICommandHandler<CreateNewsTagCommand> {
    async execute(cmd: CreateNewsTagCommand): Promise<CreateNewsTagResponse> {
        const newsExists = await NewsEntity.existsBy({ id: cmd.newsId });
        if (!newsExists) {
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi');
        }

        const tagExists = await TagsEntity.existsBy({ id: cmd.tagId });
        if (!tagExists) {
            throw new NotFoundException('Berilgan id boyicha tag topilmadi');
        }

        const alreadyLinked = await NewsTagsEntity.existsBy({
            newsId: cmd.newsId,
            tagId: cmd.tagId,
        });
        if (alreadyLinked) {
            throw new BadRequestException('Bu tag ushbu yangilikka allaqachon biriktirilgan');
        }

        const newsTag = NewsTagsEntity.create({
            newsId: cmd.newsId,
            tagId: cmd.tagId,
        } as NewsTagsEntity);

        await NewsTagsEntity.save(newsTag);

        return plainToInstance(CreateNewsTagResponse, newsTag, { excludeExtraneousValues: true });
    }
}
