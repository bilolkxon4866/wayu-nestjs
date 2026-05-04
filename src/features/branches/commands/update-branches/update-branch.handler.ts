import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateBranchCommand } from './update-branch.command';
import {BranchesEntity} from "../../branches.entity";
import {CountriesEntity} from "../../../countries/countries.entity";
import {RepresentativesEntity} from "../../../representatives/representatives.entity";


@CommandHandler(UpdateBranchCommand)
export class UpdateBranchHandler implements ICommandHandler<UpdateBranchCommand> {
    async execute(cmd: UpdateBranchCommand): Promise<void> {
        const branch = await BranchesEntity.findOneBy({ id: cmd.id });
        if (!branch) {
            throw new NotFoundException('Berilgan id boyicha filial topilmadi');
        }

        if (cmd.countryId !== undefined) {
            const countryExists = await CountriesEntity.existsBy({ id: cmd.countryId });
            if (!countryExists) {
                throw new NotFoundException('Berilgan id boyicha mamlakat topilmadi');
            }
            branch.country = { id: cmd.countryId } as any;
        }

        if (cmd.representativeId !== undefined) {
            const representativeExists = await RepresentativesEntity.existsBy({ id: cmd.representativeId });
            if (!representativeExists) {
                throw new NotFoundException('Berilgan id boyicha vakil topilmadi');
            }
            branch.representative = { id: cmd.representativeId } as any;
        }

        cmd.city = branch.city
        cmd.latitude = branch.latitude
        cmd.longitude = branch.longitude
        cmd.phoneNumber = branch.phoneNumber

        await BranchesEntity.save(branch);
    }
}