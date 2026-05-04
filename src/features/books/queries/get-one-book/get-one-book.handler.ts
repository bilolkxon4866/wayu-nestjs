import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBookQuery } from './get-one-book.query';
import { GetOneBookResponse } from './get-one-book.response';
import { NotFoundException } from '@nestjs/common';
import {BooksEntity} from "../../books.entity";

@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {
    async execute(query: GetOneBookQuery): Promise<GetOneBookResponse> {
        const book = await BooksEntity.findOne({ where: { id: query.id }, relations: ['author', 'bookCategory'] });
        if (!book) {
            throw new NotFoundException('Berilgan id bo\'yicha kitob topilmadi');
        }

        return plainToInstance(GetOneBookResponse, book, { excludeExtraneousValues: true });
    }
}
