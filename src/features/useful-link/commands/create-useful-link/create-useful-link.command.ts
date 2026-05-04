import { Command } from '@nestjs/cqrs';
import { CreateUsefulLinkResponse } from './create-useful-link.response';

export class CreateUsefulLinkCommand extends Command<CreateUsefulLinkResponse> {
    title!: string;
    icon!: string;
    link!: string;
}
