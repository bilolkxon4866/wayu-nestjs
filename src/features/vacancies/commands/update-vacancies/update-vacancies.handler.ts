import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateVacanciesCommand } from './update-vacancies.command';
import { VacanciesEntity } from '../../vacancies.entity';

@CommandHandler(UpdateVacanciesCommand)
export class UpdateVacanciesHandler implements ICommandHandler<UpdateVacanciesCommand> {
    async execute(cmd: UpdateVacanciesCommand): Promise<void> {
        const entity = await VacanciesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.title !== undefined && cmd.title !== entity.title) {
            const exists = await VacanciesEntity.existsBy({ title: ILike(cmd.title) });
            if (exists) {
                throw new BadRequestException("Bunday title allaqachon mavjud");
            }
            entity.title = cmd.title;
        }

        if (cmd.address !== undefined) entity.address = cmd.address;
        if (cmd.description !== undefined) entity.description = cmd.description;
        if (cmd.phoneNumber !== undefined) entity.phoneNumber = cmd.phoneNumber;
        if (cmd.type !== undefined) entity.type = cmd.type;
        if (cmd.salary !== undefined) entity.salary = cmd.salary;
        if (cmd.isActive !== undefined) entity.isActive = cmd.isActive;

        await VacanciesEntity.save(entity);
    }
}
