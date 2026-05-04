import { Command } from '@nestjs/cqrs';

export class UpdateFaqCommand extends Command<void> {
    id!: number;
    question?: string;
    answer?: string;
    tagIds?: number[];
}
