import { Command } from '@nestjs/cqrs';

export class UpdateEventCategoryCommand extends Command<void> {
    id!: number;
    title!: string;
}
