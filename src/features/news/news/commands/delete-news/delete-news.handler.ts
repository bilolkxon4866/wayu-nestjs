import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteNewsCommand } from './delete-news.command';
import { NewsEntity } from '../../news.entity';

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
    async execute(cmd: DeleteNewsCommand): Promise<void> {
        const news = await NewsEntity.findOneBy({ id: cmd.id });
        if (!news) {
            throw new NotFoundException('Berilgan id boyicha yangilik topilmadi');
        }

        await NewsEntity.remove(news);
    }
}
