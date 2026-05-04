import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteCountriesCommand} from "./delete-countries.command";
import {CountriesEntity} from "../../countries.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteCountriesCommand)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesCommand>{
    async execute(cmd: DeleteCountriesCommand): Promise<void>{
        const country = await CountriesEntity.findOneBy({id: cmd.id})
        if(!country)
            throw new NotFoundException("berilga id bo'yicha shahar topilmadi")

        await CountriesEntity.remove(country)
    }
}