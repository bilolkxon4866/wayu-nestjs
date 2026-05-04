import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateAuthorCommand } from './create-author.command';
import { CreateAuthorResponse } from './create-author.response';
import { AuthorEntity } from '../../author.entity';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
    async execute(cmd: CreateAuthorCommand): Promise<CreateAuthorResponse> {
        const exists = await AuthorEntity.existsBy({ fullName: ILike(cmd.fullName) });
        if (exists) {
            throw new BadRequestException("Bunday fullName allaqachon mavjud");
        }

        const entity = AuthorEntity.create({
            fullName: cmd.fullName,
        } as any);

        await AuthorEntity.save(entity);

        return plainToInstance(CreateAuthorResponse, entity, { excludeExtraneousValues: true });
    }
}
