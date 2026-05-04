import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateUsefulLinkCommand } from './create-useful-link.command';
import { CreateUsefulLinkResponse } from './create-useful-link.response';
import { UsefulLinkEntity } from '../../usefulLink.entity';

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
    async execute(cmd: CreateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
        const exists = await UsefulLinkEntity.existsBy({ link: ILike(cmd.link) });
        if (exists) {
            throw new BadRequestException("Bunday link allaqachon mavjud");
        }

        const entity = UsefulLinkEntity.create({
            title: cmd.title,
            icon: cmd.icon,
            link: cmd.link,
        } as any);

        await UsefulLinkEntity.save(entity);

        return plainToInstance(CreateUsefulLinkResponse, entity, { excludeExtraneousValues: true });
    }
}
