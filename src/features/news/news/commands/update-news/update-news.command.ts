import { Command } from '@nestjs/cqrs';

export class UpdateNewsCommand extends Command<void> {
    id!: number;
    title?: string;
    image?: string;
    date?: Date;
    content?: string;
    categoryId?: number;
    countryId?: number;
}
