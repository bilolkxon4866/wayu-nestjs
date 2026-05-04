import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteRepresentativesCommand } from './delete-representatives.command';
import { RepresentativesEntity } from '../../representatives.entity';

@CommandHandler(DeleteRepresentativesCommand)
export class DeleteRepresentativesHandler implements ICommandHandler<DeleteRepresentativesCommand> {
    async execute(cmd: DeleteRepresentativesCommand): Promise<void> {
        const entity = await RepresentativesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await RepresentativesEntity.remove(entity);
    }
}
