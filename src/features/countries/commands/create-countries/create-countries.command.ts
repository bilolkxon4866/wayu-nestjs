import {Command} from "@nestjs/cqrs";
import {CreateCountriesResponse} from "./create-countries.response";

export class CreateCountriesCommand extends Command<CreateCountriesResponse>{
    title!: string
    flag!: string
}