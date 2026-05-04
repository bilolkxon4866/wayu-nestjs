import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { UpdateCountriesCommand } from './update-countries.command';
import { CountriesEntity } from '../../countries.entity';
import {CreateCountriesResponse} from "../create-countries/create-countries.response";

@CommandHandler(UpdateCountriesCommand)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesCommand> {
    async execute(cmd: UpdateCountriesCommand): Promise<void> {
        const country = await CountriesEntity.findOneBy({ id: cmd.id });
        if (!country) {
            throw new NotFoundException('Berilgan id boyicha davlat topilmadi');
        }

        if (cmd.title && cmd.title !== country.title) {
            const titleToken = await CountriesEntity.existsBy({ title: ILike(cmd.title) });
            if (titleToken) {
                throw new BadRequestException('Bunday nomli davlat allaqachon mavjud');
            }
            country.title = cmd.title;
        }

        if (cmd.flag) {
            country.flag = cmd.flag;
        }

        await CountriesEntity.save(country);
    }
}
