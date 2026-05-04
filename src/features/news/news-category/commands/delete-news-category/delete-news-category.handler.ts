import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteNewsCategoryCommand } from './delete-news-category.command';
import { NewsCategoriesEntity } from '../../newsCategories.entity';
import { NewsEntity } from '../../../news/news.entity';

@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
    async execute(cmd: DeleteNewsCategoryCommand): Promise<void> {
        const category = await NewsCategoriesEntity.findOneBy({ id: cmd.id });
        if (!category) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        const hasNewsCategory = await NewsEntity.existsBy({ categoryId: cmd.id });
        if (hasNewsCategory) {
            throw new BadRequestException('Bu kategoriyaga biriktirilgan yangiliklar bor, avval ularni ochiring');
        }

        await NewsCategoriesEntity.remove(category);
    }
}
