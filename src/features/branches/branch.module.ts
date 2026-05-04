import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BranchesController } from './branches.controller';
import {CreateBranchHandler} from "./commands/create-branches/create-branch.handler";
import {UpdateBranchHandler} from "./commands/update-branches/update-branch.handler";
import {DeleteBranchHandler} from "./commands/delete-branches/delete-branch.handler";
import {GetBranchByIdHandler} from "./queries/get-one-branch/get-one-branch.handler";
import {GetAllBranchHandler} from "./queries/get-all-branch/get-all-branch.handler";

@Module({
    imports: [CqrsModule],
    controllers: [BranchesController],
    providers: [
        CreateBranchHandler,
        UpdateBranchHandler,
        DeleteBranchHandler,
        GetAllBranchHandler,
        GetBranchByIdHandler,
    ],
})
export class BranchesModule {}