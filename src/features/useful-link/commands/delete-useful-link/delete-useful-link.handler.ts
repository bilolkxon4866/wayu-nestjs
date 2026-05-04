import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteUsefulLinkCommand } from './delete-useful-link.command';
import { UsefulLinkEntity } from '../../usefulLink.entity';

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
    async execute(cmd: DeleteUsefulLinkCommand): Promise<void> {
        const entity = await UsefulLinkEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await UsefulLinkEntity.remove(entity);
    }
}
