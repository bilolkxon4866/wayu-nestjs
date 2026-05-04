import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventController } from './event.controller';
import CreateEventHandler from './commands/create-event/create-event.handler';
import { UpdateEventHandler } from './commands/update-event/update-event.handler';
import { DeleteEventHandler } from './commands/delete-event/delete-event.handler';
import { GetAllEventHandler } from './queries/get-all-event/get-all-event.handler';
import { GetOneEventHandler } from './queries/get-one-event/get-one-event.handler';

@Module({
    imports: [CqrsModule],
    controllers: [EventController],
    providers: [
        CreateEventHandler,
        UpdateEventHandler,
        DeleteEventHandler,
        GetAllEventHandler,
        GetOneEventHandler,
    ],
})
export class EventModule {}
