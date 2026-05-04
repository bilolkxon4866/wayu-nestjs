import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateRepresentativesCommand } from './update-representatives.command';
import { RepresentativesEntity } from '../../representatives.entity';

@CommandHandler(UpdateRepresentativesCommand)
export class UpdateRepresentativesHandler implements ICommandHandler<UpdateRepresentativesCommand> {
    async execute(cmd: UpdateRepresentativesCommand): Promise<void> {
        const entity = await RepresentativesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.email !== undefined && cmd.email !== entity.email) {
            const exists = await RepresentativesEntity.existsBy({ email: ILike(cmd.email) });
            if (exists) {
                throw new BadRequestException("Bunday email allaqachon mavjud");
            }
            entity.email = cmd.email;
        }

        if (cmd.fullname !== undefined) entity.fullname = cmd.fullname;
        if (cmd.image !== undefined) entity.image = cmd.image;
        if (cmd.phoneNumber !== undefined) entity.phoneNumber = cmd.phoneNumber;
        if (cmd.resume !== undefined) entity.resume = cmd.resume;

        await RepresentativesEntity.save(entity);
    }
}
