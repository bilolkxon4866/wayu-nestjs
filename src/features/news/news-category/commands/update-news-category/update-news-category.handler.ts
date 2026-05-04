import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateNewsCategoryCommand } from './update-news-category.command';
import { NewsCategoriesEntity } from '../../newsCategories.entity';

@CommandHandler(UpdateNewsCategoryCommand)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommand> {
    async execute(cmd: UpdateNewsCategoryCommand): Promise<void> {
        const category = await NewsCategoriesEntity.findOneBy({ id: cmd.id });
        if (!category) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        if (cmd.title !== category.title) {
            const titleTaken = await NewsCategoriesEntity.existsBy({ title: ILike(cmd.title) });
            if (titleTaken) {
                throw new BadRequestException('Bunday nomli kategoriya allaqachon mavjud');
            }
        }

        category.title = cmd.title;
        await NewsCategoriesEntity.save(category);
    }
}
