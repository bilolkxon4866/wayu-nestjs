import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateLanguageCommand } from './create-language.command';
import { CreateLanguageResponse } from './create-language.response';
import {LanguagesEntity} from "../../languages.entity";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {
    async execute(cmd: CreateLanguageCommand): Promise<CreateLanguageResponse> {
        const alreadyExists = await LanguagesEntity.existsBy({ title: ILike(cmd.title) });
        if (alreadyExists) {
            throw new BadRequestException('Bunday til allaqachon mavjud');
        }

        const language = LanguagesEntity.create({ title: cmd.title } as LanguagesEntity);
        await LanguagesEntity.save(language);

        return plainToInstance(CreateLanguageResponse, language, { excludeExtraneousValues: true });
    }
}
