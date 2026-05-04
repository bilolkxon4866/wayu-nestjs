import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteAuthorCommand } from './delete-author.command';
import { AuthorEntity } from '../../author.entity';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
    async execute(cmd: DeleteAuthorCommand): Promise<void> {
        const entity = await AuthorEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await AuthorEntity.remove(entity);
    }
}
