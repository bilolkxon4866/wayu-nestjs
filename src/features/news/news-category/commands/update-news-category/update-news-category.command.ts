import { Command } from '@nestjs/cqrs';

export class UpdateNewsCategoryCommand extends Command<void> {
    id!: number;
    title!: string;
}
