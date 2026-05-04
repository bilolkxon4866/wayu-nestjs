import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateVacanciesCommand } from './create-vacancies.command';
import { CreateVacanciesResponse } from './create-vacancies.response';
import { VacanciesEntity } from '../../vacancies.entity';

@CommandHandler(CreateVacanciesCommand)
export class CreateVacanciesHandler implements ICommandHandler<CreateVacanciesCommand> {
    async execute(cmd: CreateVacanciesCommand): Promise<CreateVacanciesResponse> {
        const exists = await VacanciesEntity.existsBy({ title: ILike(cmd.title) });
        if (exists) {
            throw new BadRequestException("Bunday title allaqachon mavjud");
        }

        const entity = VacanciesEntity.create({
            title: cmd.title,
            address: cmd.address,
            description: cmd.description,
            phoneNumber: cmd.phoneNumber,
            type: cmd.type,
            salary: cmd.salary,
            isActive: cmd.isActive,
        } as any);

        await VacanciesEntity.save(entity);

        return plainToInstance(CreateVacanciesResponse, entity, { excludeExtraneousValues: true });
    }
}
