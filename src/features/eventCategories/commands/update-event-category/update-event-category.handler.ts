import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateEventCategoryCommand } from './update-event-category.command';
import {EventCategoriesEntity} from "../../eventCategories.entity";

@CommandHandler(UpdateEventCategoryCommand)
export class UpdateEventCategoryHandler implements ICommandHandler<UpdateEventCategoryCommand> {
    async execute(cmd: UpdateEventCategoryCommand): Promise<void> {
        const category = await EventCategoriesEntity.findOneBy({ id: cmd.id });
        if (!category) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        if (cmd.title !== category.title) {
            const alreadyExists = await EventCategoriesEntity.existsBy({ title: ILike(cmd.title) });
            if (alreadyExists) {
                throw new BadRequestException('Bunday nomli kategoriya allaqachon mavjud');
            }
        }

        category.title = cmd.title;
        await EventCategoriesEntity.save(category);
    }
}
