import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateRepresentativesCommand } from './create-representatives.command';
import { CreateRepresentativesResponse } from './create-representatives.response';
import { RepresentativesEntity } from '../../representatives.entity';

@CommandHandler(CreateRepresentativesCommand)
export class CreateRepresentativesHandler implements ICommandHandler<CreateRepresentativesCommand> {
    async execute(cmd: CreateRepresentativesCommand): Promise<CreateRepresentativesResponse> {
        const exists = await RepresentativesEntity.existsBy({ email: ILike(cmd.email) });
        if (exists) {
            throw new BadRequestException("Bunday email allaqachon mavjud");
        }

        const entity = RepresentativesEntity.create({
            fullname: cmd.fullname,
            image: cmd.image,
            email: cmd.email,
            phoneNumber: cmd.phoneNumber,
            resume: cmd.resume,
        } as any);

        await RepresentativesEntity.save(entity);

        return plainToInstance(CreateRepresentativesResponse, entity, { excludeExtraneousValues: true });
    }
}
