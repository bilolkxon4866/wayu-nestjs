import { Command } from '@nestjs/cqrs';

export class DeleteTagCommand extends Command<void> {
    id!: number;
}
