import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteTagCommand } from './delete-tag.command';
import {TagsEntity} from "../../tags.entity";
import {NewsTagsEntity} from "../../../news-tags/newstags.entity";
import {FaqsTagsEntity} from "../../../faqs-tags/faqsTags.entity";

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
    async execute(cmd: DeleteTagCommand): Promise<void> {
        const tag = await TagsEntity.findOneBy({ id: cmd.id });

        if (!tag) {
            throw new NotFoundException('Berilgan id boyicha tag topilmadi');
        }

        const usedInNews = await NewsTagsEntity.existsBy({ tagId: cmd.id });
        if (usedInNews) {
            throw new BadRequestException('Bu tag yangiliklarga biriktirilgan, avval ulardan olib tashlang');
        }

        const usedInFaqs = await FaqsTagsEntity.existsBy({ tagId: cmd.id });
        if (usedInFaqs) {
            throw new BadRequestException('Bu tag FAQlarga biriktirilgan, avval ulardan olib tashlang');
        }

        await TagsEntity.remove(tag);
    }
}
