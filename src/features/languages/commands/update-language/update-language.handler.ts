import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateLanguageCommand } from './update-language.command';
import {LanguagesEntity} from "../../languages.entity";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {
    async execute(cmd: UpdateLanguageCommand): Promise<void> {
        const language = await LanguagesEntity.findOneBy({ id: cmd.id });
        if (!language) {
            throw new NotFoundException('Berilgan id boyicha til topilmadi');
        }

        if (cmd.title !== language.title) {
            const alreadyExists = await LanguagesEntity.existsBy({ title: ILike(cmd.title) });
            if (alreadyExists) {
                throw new BadRequestException('Bunday til allaqachon mavjud');
            }
        }

        language.title = cmd.title;
        await LanguagesEntity.save(language);
    }
}
