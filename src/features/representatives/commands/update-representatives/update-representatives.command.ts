import { Command } from '@nestjs/cqrs';

export class UpdateRepresentativesCommand extends Command<void> {
    id!: number;
    fullname?: string | undefined;
    image?: string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    resume?: string | undefined;
}
