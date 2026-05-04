import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateAuthorCommand } from './update-author.command';
import { AuthorEntity } from '../../author.entity';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
    async execute(cmd: UpdateAuthorCommand): Promise<void> {
        const entity = await AuthorEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.fullName !== undefined && cmd.fullName !== entity.fullName) {
            const exists = await AuthorEntity.existsBy({ fullName: ILike(cmd.fullName) });
            if (exists) {
                throw new BadRequestException("Bunday fullName allaqachon mavjud");
            }
            entity.fullName = cmd.fullName;
        }


        await AuthorEntity.save(entity);
    }
}
