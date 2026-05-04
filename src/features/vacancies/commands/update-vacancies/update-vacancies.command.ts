import { Command } from '@nestjs/cqrs';
import {VacancyType} from "../../../../core/enum/enum";

export class UpdateVacanciesCommand extends Command<void> {
    id!: number;
    title?: string | undefined;
    address?: string | undefined;
    description?: string | undefined;
    phoneNumber?: string | undefined;
    type?: VacancyType | undefined;
    salary?: string | undefined;
    isActive?: boolean | undefined;
}
