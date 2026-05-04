import { Command } from '@nestjs/cqrs';

export class DeleteEventCommand extends Command<void> {
    id!: number;
}
