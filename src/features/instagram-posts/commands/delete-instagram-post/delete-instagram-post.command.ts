import { Command } from '@nestjs/cqrs';

export class DeleteInstagramPostCommand extends Command<void> {
    id!: number;
}
