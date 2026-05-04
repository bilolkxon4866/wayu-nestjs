import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateEventCategoryCommand } from './create-event-category.command';
import { CreateEventCategoryResponse } from './create-event-category.response';
import {EventCategoriesEntity} from "../../eventCategories.entity";

@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand> {
    async execute(cmd: CreateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
        const alreadyExists = await EventCategoriesEntity.existsBy({ title: ILike(cmd.title) });
        if (alreadyExists) {
            throw new BadRequestException('Bunday nomli kategoriya allaqachon mavjud');
        }

        const category = EventCategoriesEntity.create({ title: cmd.title } as EventCategoriesEntity);
        await EventCategoriesEntity.save(category);

        return plainToInstance(CreateEventCategoryResponse, category, { excludeExtraneousValues: true });
    }
}
