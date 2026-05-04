import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativesCommand extends Command<void> {
    id!: number;
}
