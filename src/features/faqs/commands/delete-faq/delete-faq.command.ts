import { Command } from '@nestjs/cqrs';

export class DeleteFaqCommand extends Command<void> {
    id!: number;
}
