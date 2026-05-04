import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteSocialLinksCommand } from './delete-social-links.command';
import { SocialLinksEntity } from '../../socialLinks.entity';

@CommandHandler(DeleteSocialLinksCommand)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksCommand> {
    async execute(cmd: DeleteSocialLinksCommand): Promise<void> {
        const entity = await SocialLinksEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await SocialLinksEntity.remove(entity);
    }
}
