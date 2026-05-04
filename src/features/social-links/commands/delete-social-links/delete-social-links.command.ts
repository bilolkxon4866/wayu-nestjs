import { Command } from '@nestjs/cqrs';

export class DeleteSocialLinksCommand extends Command<void> {
    id!: number;
}
