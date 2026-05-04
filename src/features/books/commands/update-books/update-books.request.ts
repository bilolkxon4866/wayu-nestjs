import { IsInt, IsOptional, IsString, IsUrl, Length, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateBooksCommand } from './update-books.command';

export class UpdateBooksRequest {
    @IsString()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({ required: false })
    title?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image?: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiProperty({ required: false })
    description?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({ required: false })
    file?: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    @ApiProperty({ required: false })
    pages?: number;

    @IsInt()
    @IsOptional()
    @Min(1000)
    @Max(2100)
    @Type(() => Number)
    @ApiProperty({ required: false })
    year?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    authorId?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
    bookCategoryId?: number;

    public toCommand(id: number): UpdateBooksCommand {
        const cmd = new UpdateBooksCommand();
        cmd.id = id;
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
