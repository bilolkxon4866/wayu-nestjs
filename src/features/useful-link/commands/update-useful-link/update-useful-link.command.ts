import { Command } from '@nestjs/cqrs';

export class UpdateUsefulLinkCommand extends Command<void> {
    id!: number;
    title?: string | undefined;
    icon?: string | undefined;
    link?: string | undefined;
}
