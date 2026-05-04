import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {BooksEntity} from "../books/books.entity";

@Entity('author')
export class AuthorEntity extends BaseModule{
    @Column({type: 'varchar', length: 64})
    fullName!: string

    @OneToMany(() => BooksEntity, (book) => book.author)
    books?: BooksEntity[]
}