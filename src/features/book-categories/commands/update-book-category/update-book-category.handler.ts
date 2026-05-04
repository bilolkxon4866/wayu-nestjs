import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateBookCategoryCommand } from './update-book-category.command';
import { BookCategoriesEntity } from '../../book-categories.entity';

@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand> {
    async execute(cmd: UpdateBookCategoryCommand): Promise<void> {
        const entity = await BookCategoriesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha kategoriya topilmadi");
        }

        if (cmd.title !== undefined && cmd.title !== entity.title) {
            const exists = await BookCategoriesEntity.existsBy({ title: ILike(cmd.title) });
            if (exists) {
                throw new BadRequestException('Bunday kategoriya allaqachon mavjud');
            }
            entity.title = cmd.title;
        }

        await BookCategoriesEntity.save(entity);
    }
}
