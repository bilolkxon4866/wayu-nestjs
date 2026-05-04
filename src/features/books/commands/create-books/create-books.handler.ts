import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { CreateBooksCommand } from './create-books.command';
import { CreateBooksResponse } from './create-books.response';
import {BooksEntity} from "../../books.entity";
import {AuthorEntity} from "../../../author/author.entity";
import {BookCategoriesEntity} from "../../../book-categories/book-categories.entity";


@CommandHandler(CreateBooksCommand)
export class CreateBooksHandler implements ICommandHandler<CreateBooksCommand> {
    async execute(cmd: CreateBooksCommand): Promise<CreateBooksResponse> {
        const titleToken = await BooksEntity.existsBy({ title: ILike(cmd.title) });
        if (titleToken) {
            throw new BadRequestException('Bunday nomli kitob allaqachon mavjud');
        }

        const author = await AuthorEntity.findOneBy({ id: cmd.authorId });
        if (!author) {
            throw new NotFoundException('Berilgan author id boyicha muallif topilmadi');
        }

        const category = await BookCategoriesEntity.findOneBy({ id: cmd.bookCategoryId });
        if (!category) {
            throw new NotFoundException('Berilgan category id boyicha kitob kategoriyasi topilmadi');
        }

        const newBook = BooksEntity.create({
            title: cmd.title,
            image: cmd.image,
            description: cmd.description,
            file: cmd.file,
            pages: cmd.pages,
            year: cmd.year,
            author,
            bookCategory: category,
        });

        await BooksEntity.save(newBook);
        return plainToInstance(CreateBooksResponse, newBook, { excludeExtraneousValues: true });
    }
}
