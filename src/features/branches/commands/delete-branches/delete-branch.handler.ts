import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteBranchCommand } from './delete-branch.command';
import {BranchesEntity} from "../../branches.entity";

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
    async execute(cmd: DeleteBranchCommand): Promise<void> {
        const branch = await BranchesEntity.findOneBy({ id: cmd.id });
        if (!branch) {
            throw new NotFoundException('Berilgan id boyicha filial topilmadi');
        }

        await BranchesEntity.remove(branch);
    }
}