import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CountriesController } from './countries.controller';
import { CreateCountriesHandler } from './commands/create-countries/create-countries.handler';
import { UpdateCountriesHandler } from './commands/update-countries/update-countries.handler';
import { DeleteCountriesHandler } from './commands/delete-countries/delete-countries.handler';
import { GetAllCountriesHandler } from './queries/get-all-countries/get-all-countries.handler';
import { GetOneCountriesHandler } from './queries/get-one-countrie/get-one-countries.handler';

@Module({
    imports: [CqrsModule],
    controllers: [CountriesController],
    providers: [
        CreateCountriesHandler,
        UpdateCountriesHandler,
        DeleteCountriesHandler,
        GetAllCountriesHandler,
        GetOneCountriesHandler,
    ],
})
export class CountriesModule {}
