import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModule} from "../../core/base-module";
import {AuthorEntity} from "./author.entity";
import {BookCategoriesEntity} from "./bookCategories.entity";

@Entity('books')
export class BooksEntity extends BaseModule{
    @Column({type: 'varchar', length: 256})
    title!: string

    @Column({type: 'varchar', length: 128})
    image!: string

    @Column({type: 'text', nullable: true})
    description!: string

    @Column({type: 'varchar', length: 256})
    file!: string

    @Column({type: 'int'})
    pages!: number

    @Column({type: 'int'})
    year!: number

    @ManyToOne(() => AuthorEntity, (author) => author.books)
    @JoinColumn({name: 'authorId'})
    author!: AuthorEntity

    @ManyToOne(() => BookCategoriesEntity, (bookcategory) => bookcategory.books)
    @JoinColumn({name: 'bookCategoryId'})
    bookCategory!: BookCategoriesEntity
}