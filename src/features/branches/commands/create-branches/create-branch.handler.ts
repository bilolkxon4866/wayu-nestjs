import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateBranchCommand } from './create-branch.command';
import { CreateBranchResponse } from './create-branch.response';
import {CountriesEntity} from "../../../countries/countries.entity";
import {RepresentativesEntity} from "../../../representatives/representatives.entity";
import {BranchesEntity} from "../../branches.entity";


@CommandHandler(CreateBranchCommand)
export class CreateBranchHandler implements ICommandHandler<CreateBranchCommand> {
    async execute(cmd: CreateBranchCommand): Promise<CreateBranchResponse> {
        const countryExists = await CountriesEntity.existsBy({ id: cmd.countryId });
        if (!countryExists) {
            throw new NotFoundException('Berilgan id boyicha mamlakat topilmadi');
        }

        const representativeExists = await RepresentativesEntity.existsBy({ id: cmd.representativeId });
        if (!representativeExists) {
            throw new NotFoundException('Berilgan id boyicha vakil topilmadi');
        }

        const branch = BranchesEntity.create({
            city: cmd.city,
            latitude: cmd.latitude,
            longitude: cmd.longitude,
            phoneNumber: cmd.phoneNumber,
            country: { id: cmd.countryId } as any,
            representative: { id: cmd.representativeId } as any,
        } as BranchesEntity);

        await BranchesEntity.save(branch);

        return plainToInstance(CreateBranchResponse, branch, { excludeExtraneousValues: true });
    }
}