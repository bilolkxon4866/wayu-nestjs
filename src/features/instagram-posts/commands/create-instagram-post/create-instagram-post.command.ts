import { Command } from '@nestjs/cqrs';
import { CreateInstagramPostResponse } from './create-instagram-post.response';

export class CreateInstagramPostCommand extends Command<CreateInstagramPostResponse> {
    image!: string;
    link!: string;
}
