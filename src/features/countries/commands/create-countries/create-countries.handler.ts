import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCountriesCommand} from "./create-countries.command";
import {CreateCountriesResponse} from "./create-countries.response";
import {CountriesEntity} from "../../countries.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesCommand>{
    async execute(cmd: CreateCountriesCommand): Promise<CreateCountriesResponse> {
        const titleToken = await CountriesEntity.existsBy({title: ILike(cmd.title)})
        if(titleToken){
            throw new BadRequestException("bunday nomli davlat allaqachon qo'shilgan")
        }

        const newCountry = CountriesEntity.create({
            title: cmd.title,
            flag: cmd.flag})

        await CountriesEntity.save(newCountry)

        return plainToInstance(CreateCountriesResponse, newCountry, {excludeExtraneousValues: true})
    }
}