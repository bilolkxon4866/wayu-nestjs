import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateEventCommand } from './create-event.command';
import { CreateEventResponse } from './create-event.response';
import { EventEntity } from '../../event.entity';
import { EventCategoriesEntity } from '../../../eventCategories/eventCategories.entity';

@CommandHandler(CreateEventCommand)
class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
    async execute(cmd: CreateEventCommand): Promise<CreateEventResponse> {
        const exists = await EventEntity.existsBy({ title: ILike(cmd.title) });
        if (exists) {
            throw new BadRequestException("Bunday title allaqachon mavjud");
        }

        const related = await EventCategoriesEntity.findOneBy({ id: cmd.categoryId });
        if (!related) {
            throw new NotFoundException("Berilgan category id bo'yicha ma'lumot topilmadi");
        }

        const entity = EventEntity.create({
            title: cmd.title,
            content: cmd.content,
            image: cmd.image,
            date: cmd.date,
            address: cmd.address,
            category: related});

        await EventEntity.save(entity);

        return plainToInstance(CreateEventResponse, entity, { excludeExtraneousValues: true });
    }
}

export default CreateEventHandler
