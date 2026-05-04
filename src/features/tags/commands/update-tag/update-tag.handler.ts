import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateTagCommand } from './update-tag.command';
import {TagsEntity} from "../../tags.entity";

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
    async execute(cmd: UpdateTagCommand): Promise<void> {
        const tag = await TagsEntity.findOneBy({ id: cmd.id });
        if (!tag) {
            throw new NotFoundException('Berilgan id boyicha tag topilmadi');
        }

        if (cmd.title !== tag.title) {
            const alreadyExists = await TagsEntity.existsBy({ title: ILike(cmd.title) });
            if (alreadyExists) {
                throw new BadRequestException('Bunday nomli tag allaqachon mavjud');
            }
        }

        tag.title = cmd.title;
        await TagsEntity.save(tag);
    }
}
