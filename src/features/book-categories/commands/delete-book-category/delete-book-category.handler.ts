import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteBookCategoryCommand } from './delete-book-category.command';
import { BookCategoriesEntity } from '../../book-categories.entity';

@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
    async execute(cmd: DeleteBookCategoryCommand): Promise<void> {
        const entity = await BookCategoriesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha kategoriya topilmadi");
        }
        await BookCategoriesEntity.remove(entity);
    }
}
