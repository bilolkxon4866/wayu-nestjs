import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBooksQuery } from './get-all-books.query';
import { GetAllBooksResponse } from './get-all-books.response';
import {BooksEntity} from "../../books.entity";

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
    async execute(query: GetAllBooksQuery): Promise<GetAllBooksResponse[]> {
        const take = query.filters.size ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const books = await BooksEntity.find({ skip, take, relations: ['author', 'bookCategory'] });
        return plainToInstance(GetAllBooksResponse, books, { excludeExtraneousValues: true });
    }
}
