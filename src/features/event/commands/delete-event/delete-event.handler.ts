import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteEventCommand } from './delete-event.command';
import { EventEntity } from '../../event.entity';

@CommandHandler(DeleteEventCommand)
export class DeleteEventHandler implements ICommandHandler<DeleteEventCommand> {
    async execute(cmd: DeleteEventCommand): Promise<void> {
        const entity = await EventEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await EventEntity.remove(entity);
    }
}
