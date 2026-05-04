import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateUsefulLinkCommand } from './update-useful-link.command';
import { UsefulLinkEntity } from '../../usefulLink.entity';

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
    async execute(cmd: UpdateUsefulLinkCommand): Promise<void> {
        const entity = await UsefulLinkEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.link !== undefined && cmd.link !== entity.link) {
            const exists = await UsefulLinkEntity.existsBy({ link: ILike(cmd.link) });
            if (exists) {
                throw new BadRequestException("Bunday link allaqachon mavjud");
            }
            entity.link = cmd.link;
        }

        if (cmd.title !== undefined) entity.title = cmd.title;
        if (cmd.icon !== undefined) entity.icon = cmd.icon;

        await UsefulLinkEntity.save(entity);
    }
}
