import { Command } from '@nestjs/cqrs';
import { CreateApplicationsResponse } from './create-applications.response';
import {ApplicationStatus} from "../../../../core/enum/enum";

export class CreateApplicationsCommand extends Command<CreateApplicationsResponse> {
    fullName!: string;
    phoneNumber!: string;
    email!: string;
    vacancyId!: number;
    resume!: string;
    status!: ApplicationStatus;
}
