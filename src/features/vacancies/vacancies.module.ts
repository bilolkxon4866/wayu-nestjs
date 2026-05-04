import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VacanciesController } from './vacancies.controller';
import { CreateVacanciesHandler } from './commands/create-vacancies/create-vacancies.handler';
import { UpdateVacanciesHandler } from './commands/update-vacancies/update-vacancies.handler';
import { DeleteVacanciesHandler } from './commands/delete-vacancies/delete-vacancies.handler';
import { GetAllVacanciesHandler } from './queries/get-all-vacancies/get-all-vacancies.handler';
import { GetOneVacanciesHandler } from './queries/get-one-vacancies/get-one-vacancies.handler';

@Module({
    imports: [CqrsModule],
    controllers: [VacanciesController],
    providers: [
        CreateVacanciesHandler,
        UpdateVacanciesHandler,
        DeleteVacanciesHandler,
        GetAllVacanciesHandler,
        GetOneVacanciesHandler,
    ],
})
export class VacanciesModule {}
