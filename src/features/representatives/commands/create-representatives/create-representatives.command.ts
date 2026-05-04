import { Command } from '@nestjs/cqrs';
import { CreateRepresentativesResponse } from './create-representatives.response';

export class CreateRepresentativesCommand extends Command<CreateRepresentativesResponse> {
    fullname!: string;
    image!: string;
    email!: string;
    phoneNumber!: string;
    resume!: string;
}
