import { Command } from '@nestjs/cqrs';
import { CreateVacanciesResponse } from './create-vacancies.response';
import {VacancyType} from "../../../../core/enum/enum";

export class CreateVacanciesCommand extends Command<CreateVacanciesResponse> {
    title!: string;
    address!: string;
    description!: string;
    phoneNumber!: string;
    type!: VacancyType;
    salary!: string;
    isActive!: boolean;
}
