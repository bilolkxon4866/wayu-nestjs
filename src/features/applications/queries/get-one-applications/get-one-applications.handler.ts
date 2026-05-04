import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneApplicationsQuery } from './get-one-applications.query';
import { GetOneApplicationsResponse } from './get-one-applications.response';
import { ApplicationsEntity } from '../../applications.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneApplicationsQuery)
export class GetOneApplicationsHandler implements IQueryHandler<GetOneApplicationsQuery> {
    async execute(query: GetOneApplicationsQuery): Promise<GetOneApplicationsResponse> {
        const item = await ApplicationsEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneApplicationsResponse, item, { excludeExtraneousValues: true });
    }
}
