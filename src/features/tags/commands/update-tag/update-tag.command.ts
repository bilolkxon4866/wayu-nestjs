import { Command } from '@nestjs/cqrs';

export class UpdateTagCommand extends Command<void> {
    id!: number;
    title!: string;
}
