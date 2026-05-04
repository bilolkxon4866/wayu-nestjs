import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike, In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateFaqCommand } from './create-faq.command';
import { CreateFaqResponse } from './create-faq.response';
import {FaqsEntity} from "../../faqs.entity";
import {TagsEntity} from "../../../tags/tags.entity";
import {FaqsTagsEntity} from "../../../faqs-tags/faqsTags.entity";

@CommandHandler(CreateFaqCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqCommand> {
    async execute(cmd: CreateFaqCommand): Promise<CreateFaqResponse> {
        const alreadyExists = await FaqsEntity.existsBy({ question: ILike(cmd.question) });
        if (alreadyExists) {
            throw new BadRequestException('Bunday savol allaqachon mavjud');
        }

        if (cmd.tagIds && cmd.tagIds.length > 0) {
            const foundTags = await TagsEntity.findBy({ id: In(cmd.tagIds) });
            if (foundTags.length !== cmd.tagIds.length) {
                throw new NotFoundException('Berilgan taglardan biri yoki bir nechtasi topilmadi');
            }
        }

        const faq = FaqsEntity.create({
            question: cmd.question,
            answer: cmd.answer,
        } as FaqsEntity);

        await FaqsEntity.save(faq);

        if (cmd.tagIds && cmd.tagIds.length > 0) {
            const faqTags = cmd.tagIds.map((tagId) =>
                FaqsTagsEntity.create({
                    faqsId: faq.id,
                    tagId,
                } as FaqsTagsEntity),
            );
            await FaqsTagsEntity.save(faqTags);
        }

        return plainToInstance(CreateFaqResponse, faq, { excludeExtraneousValues: true });
    }
}
