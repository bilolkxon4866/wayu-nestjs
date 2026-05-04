import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateSocialLinksCommand } from './update-social-links.command';
import { SocialLinksEntity } from '../../socialLinks.entity';

@CommandHandler(UpdateSocialLinksCommand)
export class UpdateSocialLinksHandler implements ICommandHandler<UpdateSocialLinksCommand> {
    async execute(cmd: UpdateSocialLinksCommand): Promise<void> {
        const entity = await SocialLinksEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.link !== undefined && cmd.link !== entity.link) {
            const exists = await SocialLinksEntity.existsBy({ link: ILike(cmd.link) });
            if (exists) {
                throw new BadRequestException("Bunday link allaqachon mavjud");
            }
            entity.link = cmd.link;
        }

        if (cmd.title !== undefined) entity.title = cmd.title;
        if (cmd.icon !== undefined) entity.icon = cmd.icon;

        await SocialLinksEntity.save(entity);
    }
}
