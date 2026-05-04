import { Command } from '@nestjs/cqrs';

export class DeleteFaqsTagCommand extends Command<void> {
    id!: number;
}
