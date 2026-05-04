import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StaticInfoController } from './static-info.controller';
import { UpdateStaticInfoHandler } from './commands/update-static-info/update-static-info.handler';
import { GetStaticInfoHandler } from './queries/get-static-info/get-static-info.handler';

@Module({
    imports: [CqrsModule],
    controllers: [StaticInfoController],
    providers: [
        UpdateStaticInfoHandler,
        GetStaticInfoHandler,
    ],
})
export class StaticInfoModule {}
