import { Command } from '@nestjs/cqrs';
import {ApplicationStatus} from "../../../../core/enum/enum";

export class UpdateApplicationsCommand extends Command<void> {
    id!: number
    fullName?: string
    phoneNumber?: string
    email?: string
    vacancyId?: number
    resume?: string
    status?: ApplicationStatus
}
