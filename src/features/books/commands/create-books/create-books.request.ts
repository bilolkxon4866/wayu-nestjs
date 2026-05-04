import { IsInt, IsOptional, IsString, IsUrl, Length, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBooksCommand } from './create-books.command';

export class CreateBooksRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty({ required: false })
    title!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image!: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiProperty({ required: false })
    description?: string;

    @IsUrl()
    @MaxLength(256)
    @ApiProperty({required: false })
    file!: string;

    @IsInt()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    @ApiProperty({required: false})
    pages!: number;

    @IsInt()
    @Min(1000)
    @Max(2100)
    @Type(() => Number)
    @ApiProperty()
    year!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false})
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
