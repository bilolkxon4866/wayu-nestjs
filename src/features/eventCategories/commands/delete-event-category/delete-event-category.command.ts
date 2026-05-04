import { Command } from '@nestjs/cqrs';

export class DeleteEventCategoryCommand extends Command<void> {
    id!: number;
}
