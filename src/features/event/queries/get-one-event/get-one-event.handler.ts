import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneEventQuery } from './get-one-event.query';
import { GetOneEventResponse } from './get-one-event.response';
import { EventEntity } from '../../event.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneEventQuery)
export class GetOneEventHandler implements IQueryHandler<GetOneEventQuery> {
    async execute(query: GetOneEventQuery): Promise<GetOneEventResponse> {
        const item = await EventEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneEventResponse, item, { excludeExtraneousValues: true });
    }
}
