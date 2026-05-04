import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateSocialLinksCommand } from './create-social-links.command';
import { CreateSocialLinksResponse } from './create-social-links.response';
import { SocialLinksEntity } from '../../socialLinks.entity';

@CommandHandler(CreateSocialLinksCommand)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksCommand> {
    async execute(cmd: CreateSocialLinksCommand): Promise<CreateSocialLinksResponse> {
        const exists = await SocialLinksEntity.existsBy({ link: ILike(cmd.link) });
        if (exists) {
            throw new BadRequestException("Bunday link allaqachon mavjud");
        }

        const entity = SocialLinksEntity.create({
            title: cmd.title,
            icon: cmd.icon,
            link: cmd.link,
        } as any);

        await SocialLinksEntity.save(entity);

        return plainToInstance(CreateSocialLinksResponse, entity, { excludeExtraneousValues: true });
    }
}
