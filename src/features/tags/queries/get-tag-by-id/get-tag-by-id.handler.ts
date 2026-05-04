import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetTagByIdQuery } from './get-tag-by-id.query';
import { GetTagByIdResponse } from './get-tag-by-id.response';
import {TagsEntity} from "../../tags.entity";

@QueryHandler(GetTagByIdQuery)
export class GetTagByIdHandler implements IQueryHandler<GetTagByIdQuery> {
    async execute(query: GetTagByIdQuery): Promise<GetTagByIdResponse> {
        const tag = await TagsEntity.findOneBy({ id: query.id });
        if (!tag) {
            throw new NotFoundException('Berilgan id boyicha tag topilmadi');
        }

        return plainToInstance(GetTagByIdResponse, tag, { excludeExtraneousValues: true });
    }
}
