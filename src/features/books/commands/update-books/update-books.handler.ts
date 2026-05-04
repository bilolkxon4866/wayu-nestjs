import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';
import { UpdateBooksCommand } from './update-books.command';
import {BooksEntity} from "../../books.entity";
import {AuthorEntity} from "../../../author/author.entity";
import {BookCategoriesEntity} from "../../../book-categories/book-categories.entity";


@CommandHandler(UpdateBooksCommand)
export class UpdateBooksHandler implements ICommandHandler<UpdateBooksCommand> {
    async execute(cmd: UpdateBooksCommand): Promise<void> {
        const book = await BooksEntity.findOne({ where: { id: cmd.id }, relations: ['author', 'bookCategory'] });
        if (!book) {
            throw new NotFoundException('Berilgan id bo\'yicha kitob topilmadi');
        }

        if (cmd.title && cmd.title !== book.title) {
            const titleToken = await BooksEntity.existsBy({ title: ILike(cmd.title) });
            if (titleToken) {
                throw new BadRequestException('Bunday nomli kitob allaqachon mavjud');
            }
            book.title = cmd.title;
        }

        if (cmd.image) {
            book.image = cmd.image;
        }

        if (cmd.description !== undefined) {
            book.description = cmd.description;
        }

        if (cmd.file) {
            book.file = cmd.file;
        }

        if (cmd.pages !== undefined) {
            book.pages = cmd.pages;
        }

        if (cmd.year !== undefined) {
            book.year = cmd.year;
        }

        if (cmd.authorId !== undefined) {
            const author = await AuthorEntity.findOneBy({ id: cmd.authorId });
            if (!author) {
                throw new NotFoundException('Berilgan author id bo\'yicha muallif topilmadi');
            }
            book.author = author;
        }

        if (cmd.bookCategoryId !== undefined) {
            const category = await BookCategoriesEntity.findOneBy({ id: cmd.bookCategoryId });
            if (!category) {
                throw new NotFoundException('Berilgan category id bo\'yicha kitob kategoriyasi topilmadi');
            }
            book.bookCategory = category;
        }

        await BooksEntity.save(book);
    }
}
