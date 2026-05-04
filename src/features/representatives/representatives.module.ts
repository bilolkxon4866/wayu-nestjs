import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepresentativesController } from './representatives.controller';
import { CreateRepresentativesHandler } from './commands/create-representatives/create-representatives.handler';
import { UpdateRepresentativesHandler } from './commands/update-representatives/update-representatives.handler';
import { DeleteRepresentativesHandler } from './commands/delete-representatives/delete-representatives.handler';
import { GetAllRepresentativesHandler } from './queries/get-all-representatives/get-all-representatives.handler';
import { GetOneRepresentativesHandler } from './queries/get-one-representatives/get-one-representatives.handler';

@Module({
    imports: [CqrsModule],
    controllers: [RepresentativesController],
    providers: [
        CreateRepresentativesHandler,
        UpdateRepresentativesHandler,
        DeleteRepresentativesHandler,
        GetAllRepresentativesHandler,
        GetOneRepresentativesHandler,
    ],
})
export class RepresentativesModule {}
