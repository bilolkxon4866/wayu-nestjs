import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteFaqCommand } from './delete-faq.command';
import {FaqsEntity} from "../../faqs.entity";
import {FaqsTagsEntity} from "../../../faqs-tags/faqsTags.entity";

@CommandHandler(DeleteFaqCommand)
export class DeleteFaqHandler implements ICommandHandler<DeleteFaqCommand> {
    async execute(cmd: DeleteFaqCommand): Promise<void> {
        const faq = await FaqsEntity.findOneBy({ id: cmd.id });
        if (!faq) {
            throw new NotFoundException('Berilgan id boyicha FAQ topilmadi');
        }

        await FaqsTagsEntity.delete({ faqsId: faq.id });

        await FaqsEntity.remove(faq);
    }
}
