import { Command } from '@nestjs/cqrs';

export class UpdateSocialLinksCommand extends Command<void> {
    id!: number;
    title?: string | undefined;
    icon?: string | undefined;
    link?: string | undefined;
}
