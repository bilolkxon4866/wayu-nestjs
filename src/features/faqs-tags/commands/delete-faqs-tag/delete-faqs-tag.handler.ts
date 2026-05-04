import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteFaqsTagCommand } from './delete-faqs-tag.command';
import {FaqsTagsEntity} from "../../faqsTags.entity";

@CommandHandler(DeleteFaqsTagCommand)
export class DeleteFaqsTagHandler implements ICommandHandler<DeleteFaqsTagCommand> {
    async execute(cmd: DeleteFaqsTagCommand): Promise<void> {
        const faqsTag = await FaqsTagsEntity.findOneBy({ id: cmd.id });
        if (!faqsTag) {
            throw new NotFoundException('Berilgan id boyicha FAQ-tag ga boglanish topilmadi');
        }

        await FaqsTagsEntity.remove(faqsTag);
    }
}
