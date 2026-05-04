import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateFaqsTagCommand } from './create-faqs-tag.command';
import { CreateFaqsTagResponse } from './create-faqs-tag.response'
import {FaqsEntity} from "../../../faqs/faqs.entity";
import {TagsEntity} from "../../../tags/tags.entity";
import {FaqsTagsEntity} from "../../faqsTags.entity";


@CommandHandler(CreateFaqsTagCommand)
export class CreateFaqsTagHandler implements ICommandHandler<CreateFaqsTagCommand> {
    async execute(cmd: CreateFaqsTagCommand): Promise<CreateFaqsTagResponse> {
        const faqExists = await FaqsEntity.existsBy({ id: cmd.faqsId });
        if (!faqExists) {
            throw new NotFoundException('Berilgan id boyicha FAQ topilmadi');
        }

        const tagExists = await TagsEntity.existsBy({ id: cmd.tagId });
        if (!tagExists) {
            throw new NotFoundException('Berilgan id boyicha tag topilmadi');
        }

        const alreadyLinked = await FaqsTagsEntity.existsBy({
            faqsId: cmd.faqsId,
            tagId: cmd.tagId,
        });
        if (alreadyLinked) {
            throw new BadRequestException('Bu tag ushbu FAQga allaqachon biriktirilgan');
        }

        const faqsTag = FaqsTagsEntity.create({
            faqsId: cmd.faqsId,
            tagId: cmd.tagId,
        } as FaqsTagsEntity);

        await FaqsTagsEntity.save(faqsTag);

        return plainToInstance(CreateFaqsTagResponse, faqsTag, { excludeExtraneousValues: true });
    }
}
