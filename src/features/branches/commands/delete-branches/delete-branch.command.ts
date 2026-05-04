import { Command } from '@nestjs/cqrs';

export class DeleteBranchCommand extends Command<void> {
    id!: number;
}