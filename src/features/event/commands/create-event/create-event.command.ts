import { Command } from '@nestjs/cqrs';
import { CreateEventResponse } from './create-event.response';

export class CreateEventCommand extends Command<CreateEventResponse> {
    title!: string;
    content!: string;
    image!: string;
    date!: string;
    address!: string;
    categoryId!: number;
}
