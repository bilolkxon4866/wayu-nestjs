import { Command } from '@nestjs/cqrs';

export class DeleteAuthorCommand extends Command<void> {
    id!: number;
}
