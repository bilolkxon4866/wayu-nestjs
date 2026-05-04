import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteEventCategoryCommand } from './delete-event-category.command'
import {EventCategoriesEntity} from "../../eventCategories.entity";
import {EventEntity} from "../../../event/event.entity";


@CommandHandler(DeleteEventCategoryCommand)
export class DeleteEventCategoryHandler implements ICommandHandler<DeleteEventCategoryCommand> {
    async execute(cmd: DeleteEventCategoryCommand): Promise<void> {
        const category = await EventCategoriesEntity.findOneBy({ id: cmd.id });
        if (!category) {
            throw new NotFoundException('Berilgan id boyicha kategoriya topilmadi');
        }

        const hasEvents = await EventEntity.existsBy({ category: { id: cmd.id } });
        if (hasEvents) {
            throw new BadRequestException('Bu kategoriyaga biriktirilgan tadbirlar bor, avval ularni o\'chiring');
        }

        await EventCategoriesEntity.remove(category);
    }
}
