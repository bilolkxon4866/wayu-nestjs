import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateNewsCommand } from './create-news.command';
import { CreateNewsResponse } from './create-news.response';
import { NewsEntity } from '../../news.entity';
import { NewsCategoriesEntity } from '../../../news-category/newsCategories.entity';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
    async execute(cmd: CreateNewsCommand): Promise<CreateNewsResponse> {
        const titleTaken = await NewsEntity.existsBy({ title: ILike(cmd.title) });
        if (titleTaken) {
            throw new BadRequestException('Bunday sarlavhali yangilik allaqachon mavjud');
        }

        const categoryExists = await NewsCategoriesEntity.existsBy({ id: cmd.categoryId });
        if (!categoryExists) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        const news = NewsEntity.create({
            title: cmd.title,
            image: cmd.image,
            date: cmd.date,
            content: cmd.content,
            categoryId: cmd.categoryId,} as NewsEntity)

        await NewsEntity.save(news);

        return plainToInstance(CreateNewsResponse, news, { excludeExtraneousValues: true });
    }
}
