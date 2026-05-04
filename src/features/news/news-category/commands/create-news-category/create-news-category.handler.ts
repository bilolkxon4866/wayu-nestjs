import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateNewsCategoryCommand } from './create-news-category.command';
import { CreateNewsCategoryResponse } from './create-news-category.response';
import { NewsCategoriesEntity } from '../../newsCategories.entity';

@CommandHandler(CreateNewsCategoryCommand)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommand> {
    async execute(cmd: CreateNewsCategoryCommand): Promise<CreateNewsCategoryResponse> {
        const alreadyExists = await NewsCategoriesEntity.existsBy({ title: ILike(cmd.title) });
        if (alreadyExists) {
            throw new BadRequestException('Bunday nomli kategoriya allaqachon mavjud');
        }

        const category = NewsCategoriesEntity.create({ title: cmd.title } as NewsCategoriesEntity);
        await NewsCategoriesEntity.save(category);

        return plainToInstance(CreateNewsCategoryResponse, category, { excludeExtraneousValues: true });
    }
}
