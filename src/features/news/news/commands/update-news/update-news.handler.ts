import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateNewsCommand } from './update-news.command';
import { NewsEntity } from '../../news.entity';
import { NewsCategoriesEntity } from '../../../news-category/newsCategories.entity';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
    async execute(cmd: UpdateNewsCommand): Promise<void> {
        const news = await NewsEntity.findOneBy({ id: cmd.id });
        if (!news) {
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi');
        }

        if (cmd.title && cmd.title !== news.title) {
            const titleTaken = await NewsEntity.existsBy({ title: ILike(cmd.title) });
            if (titleTaken) {
                throw new BadRequestException('Bunday sarlavhali yangilik allaqachon mavjud');
            }
            news.title = cmd.title;
        }

        if (cmd.categoryId && cmd.categoryId !== news.categoryId) {
            const categoryExists = await NewsCategoriesEntity.existsBy({ id: cmd.categoryId });
            if (!categoryExists) {
                throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
            }
            news.categoryId = cmd.categoryId;
        }

        if (cmd.image !== undefined) news.image = cmd.image;
        if (cmd.date !== undefined) news.date = cmd.date;
        if (cmd.content !== undefined) news.content = cmd.content;

        await NewsEntity.save(news);
    }
}
