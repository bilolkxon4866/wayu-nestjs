import { Command } from '@nestjs/cqrs';

export class UpdateInstagramPostCommand extends Command<void> {
    id!: number;
    image?: string;
    link?: string;
}
