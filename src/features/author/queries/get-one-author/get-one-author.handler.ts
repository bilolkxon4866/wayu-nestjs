import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneAuthorQuery } from './get-one-author.query';
import { GetOneAuthorResponse } from './get-one-author.response';
import { AuthorEntity } from '../../author.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneAuthorQuery)
export class GetOneAuthorHandler implements IQueryHandler<GetOneAuthorQuery> {
    async execute(query: GetOneAuthorQuery): Promise<GetOneAuthorResponse> {
        const item = await AuthorEntity.findOneBy({ id: query.id });
        if (!item) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }

        return plainToInstance(GetOneAuthorResponse, item, { excludeExtraneousValues: true });
    }
}
