import { Command } from '@nestjs/cqrs';
import { CreateBranchResponse } from './create-branch.response';

export class CreateBranchCommand extends Command<CreateBranchResponse> {
    city!: string;
    latitude!: number;
    longitude!: number;
    phoneNumber!: string;
    countryId!: number;
    representativeId!: number;
}