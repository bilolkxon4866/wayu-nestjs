import { Command } from '@nestjs/cqrs';

export class UpdateAuthorCommand extends Command<void> {
    id!: number;
    fullName?: string | undefined;
}
