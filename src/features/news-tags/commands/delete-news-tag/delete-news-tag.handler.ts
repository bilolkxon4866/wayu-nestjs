import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteNewsTagCommand } from './delete-news-tag.command';
import {NewsTagsEntity} from "../../newstags.entity";

@CommandHandler(DeleteNewsTagCommand)
export class DeleteNewsTagHandler implements ICommandHandler<DeleteNewsTagCommand> {
    async execute(cmd: DeleteNewsTagCommand): Promise<void> {
        const newsTag = await NewsTagsEntity.findOneBy({ id: cmd.id });
        if (!newsTag) {
            throw new NotFoundException('Berilgan id boyicha yangilik-tag bog\'lanishi topilmadi');
        }

        await NewsTagsEntity.remove(newsTag);
    }
}
