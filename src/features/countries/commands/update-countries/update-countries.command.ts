import { Command } from '@nestjs/cqrs';

export class UpdateCountriesCommand extends Command<void> {
    id!: number;
    title?: string
    flag?: string
}
