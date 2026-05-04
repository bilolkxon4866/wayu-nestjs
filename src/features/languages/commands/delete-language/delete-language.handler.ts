import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteLanguageCommand } from './delete-language.command';
import {LanguagesEntity} from "../../languages.entity";

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {
    async execute(cmd: DeleteLanguageCommand): Promise<void> {
        const language = await LanguagesEntity.findOneBy({ id: cmd.id });
        if (!language) {
            throw new NotFoundException('Berilgan id boyicha til topilmadi');
        }

        await LanguagesEntity.remove(language);
    }
}
