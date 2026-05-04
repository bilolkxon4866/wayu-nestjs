import { Command } from '@nestjs/cqrs';
import { CreateSocialLinksResponse } from './create-social-links.response';

export class CreateSocialLinksCommand extends Command<CreateSocialLinksResponse> {
    title!: string;
    icon!: string;
    link!: string;
}
