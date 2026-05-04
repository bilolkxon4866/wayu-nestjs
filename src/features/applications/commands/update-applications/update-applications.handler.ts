import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateApplicationsCommand } from './update-applications.command';
import { ApplicationsEntity } from '../../applications.entity';
import { VacanciesEntity } from '../../../vacancies/vacancies.entity';

@CommandHandler(UpdateApplicationsCommand)
export class UpdateApplicationsHandler implements ICommandHandler<UpdateApplicationsCommand> {
    async execute(cmd: UpdateApplicationsCommand): Promise<void> {
        const entity = await ApplicationsEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        if (cmd.vacancyId !== undefined) {
            const related = await VacanciesEntity.findOneBy({ id: cmd.vacancyId });
            if (!related) {
                throw new NotFoundException("Berilgan vacancy id bo'yicha ma'lumot topilmadi");
            }
            entity.vacancy = related;
        }

        if (cmd.fullName !== undefined) entity.fullName = cmd.fullName;
        if (cmd.phoneNumber !== undefined) entity.phoneNumber = cmd.phoneNumber;
        if (cmd.email !== undefined) entity.email = cmd.email;
        if (cmd.resume !== undefined) entity.resume = cmd.resume;
        if (cmd.status !== undefined) entity.status = cmd.status;

        await ApplicationsEntity.save(entity);
    }
}
