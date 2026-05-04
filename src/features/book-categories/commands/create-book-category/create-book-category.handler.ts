import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateBookCategoryCommand } from './create-book-category.command';
import { CreateBookCategoryResponse } from './create-book-category.response';
import { BookCategoriesEntity } from '../../book-categories.entity';

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
    async execute(cmd: CreateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
        const exists = await BookCategoriesEntity.existsBy({ title: ILike(cmd.title) });
        if (exists) {
            throw new BadRequestException('Bunday kategoriya allaqachon mavjud');
        }

        const entity = BookCategoriesEntity.create({
            title: cmd.title,
        } as any);

        await BookCategoriesEntity.save(entity);

        return plainToInstance(CreateBookCategoryResponse, entity, { excludeExtraneousValues: true });
    }
}
