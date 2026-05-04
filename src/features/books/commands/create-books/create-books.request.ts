import {Allow, IsInt, IsOptional, IsString, IsUrl, Length, Max, MaxLength, Min, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBooksCommand } from './create-books.command';

export class CreateBooksRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @Allow()
    @ApiProperty({type: "string", format: "binary"})
    image!: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiProperty({ required: false })
    description?: string;

    @IsUrl()
    @MaxLength(256)
    @ApiProperty()
    file!: string;

    @IsInt()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    @ApiProperty()
    pages!: number;

    @IsInt()
    @Max(2100)
    @Type(() => Number)
    @ApiProperty()
    year!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    authorId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    bookCategoryId!: number;

    public toCommand(): CreateBooksCommand {
        const cmd = new CreateBooksCommand();
        cmd.title = this.title;
        cmd.image = this.image;
        cmd.description = this.description;
        cmd.file = this.file;
        cmd.pages = this.pages;
        cmd.year = this.year;
        cmd.authorId = this.authorId;
        cmd.bookCategoryId = this.bookCategoryId;
        return cmd;
    }
}
