import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LanguagesController } from './languages.controller';
import { CreateLanguageHandler } from './commands/create-language/create-language.handler';
import { UpdateLanguageHandler } from './commands/update-language/update-language.handler';
import { DeleteLanguageHandler } from './commands/delete-language/delete-language.handler';
import { GetAllLanguagesHandler } from './queries/get-all-languages/get-all-languages.handler';
import { GetLanguageByIdHandler } from './queries/get-language-by-id/get-language-by-id.handler';

@Module({
    imports: [CqrsModule],
    controllers: [LanguagesController],
    providers: [
        CreateLanguageHandler,
        UpdateLanguageHandler,
        DeleteLanguageHandler,
        GetAllLanguagesHandler,
        GetLanguageByIdHandler,
    ],
})
export class LanguagesModule {}
