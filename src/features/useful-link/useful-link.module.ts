import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsefulLinkController } from './useful-link.controller';
import { CreateUsefulLinkHandler } from './commands/create-useful-link/create-useful-link.handler';
import { UpdateUsefulLinkHandler } from './commands/update-useful-link/update-useful-link.handler';
import { DeleteUsefulLinkHandler } from './commands/delete-useful-link/delete-useful-link.handler';
import { GetAllUsefulLinkHandler } from './queries/get-all-useful-link/get-all-useful-link.handler';
import { GetOneUsefulLinkHandler } from './queries/get-one-useful-link/get-one-useful-link.handler';

@Module({
    imports: [CqrsModule],
    controllers: [UsefulLinkController],
    providers: [
        CreateUsefulLinkHandler,
        UpdateUsefulLinkHandler,
        DeleteUsefulLinkHandler,
        GetAllUsefulLinkHandler,
        GetOneUsefulLinkHandler,
    ],
})
export class UsefulLinkModule {}
