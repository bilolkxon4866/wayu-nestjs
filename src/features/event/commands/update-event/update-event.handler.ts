import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateEventCommand } from './update-event.command';
import { EventEntity } from '../../event.entity';
import { EventCategoriesEntity } from '../../../eventCategories/eventCategories.entity';

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
    async execute(cmd: UpdateEventCommand): Promise<void> {
        const entity = await EventEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.title !== undefined && cmd.title !== entity.title) {
            const exists = await EventEntity.existsBy({ title: ILike(cmd.title) });
            if (exists) {
                throw new BadRequestException("Bunday title allaqachon mavjud");
            }
            entity.title = cmd.title;
        }

        if (cmd.categoryId) {
            const related = await EventCategoriesEntity.findOneBy({ id: cmd.categoryId });
            if (!related) {
                throw new NotFoundException("Berilgan category id bo'yicha ma'lumot topilmadi");
            }
            entity.category = related;
        }

        if (cmd.content !== undefined) entity.content = cmd.content;
        if (cmd.image !== undefined) entity.image = cmd.image;
        if (cmd.date !== undefined) entity.date = new Date(cmd.date)
        if (cmd.address !== undefined) entity.address = cmd.address;

        await EventEntity.save(entity);
    }
}
