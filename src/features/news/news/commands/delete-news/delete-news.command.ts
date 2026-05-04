import { Command } from '@nestjs/cqrs';

export class DeleteNewsCommand extends Command<void> {
    id!: number;
}
