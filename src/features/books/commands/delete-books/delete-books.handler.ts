import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBooksCommand } from './delete-books.command';
import {BooksEntity} from "../../books.entity";


@CommandHandler(DeleteBooksCommand)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksCommand> {
    async execute(cmd: DeleteBooksCommand): Promise<void> {
        const book = await BooksEntity.findOneBy({ id: cmd.id });
        if (!book) {
            throw new NotFoundException('Berilgan id bo\'yicha kitob topilmadi');
        }

        await BooksEntity.remove(book);
    }
}
