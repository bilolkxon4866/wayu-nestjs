import { Command } from '@nestjs/cqrs';

export class UpdateBranchCommand extends Command<void> {
    id!: number;
    city?: string;
    latitude?: number;
    longitude?: number;
    phoneNumber?: string;
    countryId?: number;
    representativeId?: number;
}