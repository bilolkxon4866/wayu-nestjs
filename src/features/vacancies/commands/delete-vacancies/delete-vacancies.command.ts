import { Command } from '@nestjs/cqrs';

export class DeleteVacanciesCommand extends Command<void> {
    id!: number;
}
