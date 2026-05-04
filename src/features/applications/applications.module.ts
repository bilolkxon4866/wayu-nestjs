import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationsController } from './applications.controller';
import { CreateApplicationsHandler } from './commands/create-applications/create-applications.handler';
import { UpdateApplicationsHandler } from './commands/update-applications/update-applications.handler';
import { DeleteApplicationsHandler } from './commands/delete-applications/delete-applications.handler';
import { GetAllApplicationsHandler } from './queries/get-all-applications/get-all-applications.handler';
import { GetOneApplicationsHandler } from './queries/get-one-applications/get-one-applications.handler';

@Module({
    imports: [CqrsModule],
    controllers: [ApplicationsController],
    providers: [
        CreateApplicationsHandler,
        UpdateApplicationsHandler,
        DeleteApplicationsHandler,
        GetAllApplicationsHandler,
        GetOneApplicationsHandler,
    ],
})
export class ApplicationsModule {}
