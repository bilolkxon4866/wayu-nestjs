import { Command } from '@nestjs/cqrs';

export class DeleteApplicationsCommand extends Command<void> {
    id!: number;
}
