import {Column, Entity, OneToMany} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {BooksEntity} from "./books.entity";

@Entity('bookCategories')
export class BookCategoriesEntity extends BaseModule{
    @Column({type: 'varchar', length: 64, unique: true})
    title!: string

    @OneToMany(() => BooksEntity, (book) => book.bookCategory)
    books?: BooksEntity[]
}