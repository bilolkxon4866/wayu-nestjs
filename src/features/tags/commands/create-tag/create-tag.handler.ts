import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateTagCommand } from './create-tag.command';
import { CreateTagResponse } from './create-tag.response';
import {TagsEntity} from "../../tags.entity";

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
    async execute(cmd: CreateTagCommand): Promise<CreateTagResponse> {
        const alreadyExists = await TagsEntity.existsBy({ title: ILike(cmd.title) });
        if (alreadyExists) {
            throw new BadRequestException('Bunday nomli tag allaqachon mavjud');
        }

        const tag = TagsEntity.create({ title: cmd.title } as TagsEntity);
        await TagsEntity.save(tag);

        return plainToInstance(CreateTagResponse, tag, { excludeExtraneousValues: true });
    }
}
