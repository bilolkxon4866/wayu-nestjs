import {NotFoundException} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs"
import {UpdateFaqCommand} from "./update-faq.command";
import {FaqsEntity} from "../../faqs.entity";

@CommandHandler(UpdateFaqCommand)
export class UpdateFaqHandler implements ICommandHandler<UpdateFaqCommand> {
    async execute(command: UpdateFaqCommand): Promise<void> {
        const entity = await FaqsEntity.findOneBy({id: command.id});
        if (!entity) throw new NotFoundException("faq not found");

        if (command.question)
            entity.question = command.question;

        if (command.answer)
            entity.answer = command.answer;


        await FaqsEntity.save(entity)
    }
}