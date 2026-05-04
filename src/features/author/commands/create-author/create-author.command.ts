import { Command } from '@nestjs/cqrs';
import { CreateAuthorResponse } from './create-author.response';

export class CreateAuthorCommand extends Command<CreateAuthorResponse> {
    fullName!: string;
}
