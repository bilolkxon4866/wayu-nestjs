import { Command } from '@nestjs/cqrs';

export class DeleteNewsTagCommand extends Command<void> {
    id!: number;
}
