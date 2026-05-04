import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateApplicationsCommand } from './create-applications.command';
import { CreateApplicationsResponse } from './create-applications.response';
import { ApplicationsEntity } from '../../applications.entity';
import { VacanciesEntity } from '../../../vacancies/vacancies.entity';

@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsHandler implements ICommandHandler<CreateApplicationsCommand> {
    async execute(cmd: CreateApplicationsCommand): Promise<CreateApplicationsResponse> {
        const related = await VacanciesEntity.findOneBy({ id: cmd.vacancyId });
        if (!related) {
            throw new NotFoundException("Berilgan vacancy id bo'yicha ma'lumot topilmadi");
        }

        const entity = ApplicationsEntity.create({
            fullName: cmd.fullName,
            phoneNumber: cmd.phoneNumber,
            email: cmd.email,
            resume: cmd.resume,
            status: cmd.status,
            vacancy: related,
        } as any);

        await ApplicationsEntity.save(entity);

        return plainToInstance(CreateApplicationsResponse, entity, { excludeExtraneousValues: true });
    }
}
