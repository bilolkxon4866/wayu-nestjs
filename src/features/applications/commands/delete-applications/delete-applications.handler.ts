import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteApplicationsCommand } from './delete-applications.command';
import { ApplicationsEntity } from '../../applications.entity';

@CommandHandler(DeleteApplicationsCommand)
export class DeleteApplicationsHandler implements ICommandHandler<DeleteApplicationsCommand> {
    async execute(cmd: DeleteApplicationsCommand): Promise<void> {
        const entity = await ApplicationsEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await ApplicationsEntity.remove(entity);
    }
}
