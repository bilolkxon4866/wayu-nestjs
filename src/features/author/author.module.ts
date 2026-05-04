import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorController } from './author.controller';
import { CreateAuthorHandler } from './commands/create-author/create-author.handler';
import { UpdateAuthorHandler } from './commands/update-author/update-author.handler';
import { DeleteAuthorHandler } from './commands/delete-author/delete-author.handler';
import { GetAllAuthorHandler } from './queries/get-all-author/get-all-author.handler';
import { GetOneAuthorHandler } from './queries/get-one-author/get-one-author.handler';

@Module({
    imports: [CqrsModule],
    controllers: [AuthorController],
    providers: [
        CreateAuthorHandler,
        UpdateAuthorHandler,
        DeleteAuthorHandler,
        GetAllAuthorHandler,
        GetOneAuthorHandler,
    ],
})
export class AuthorModule {}
