import { IsDateString, IsInt, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateNewsCommand } from './update-news.command';

export class UpdateNewsRequest {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty({ required: false})
    title?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false})
    image?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false})
    date?: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiProperty({ required: false })
    content?: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false, example: 2 })
    categoryId?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false, example: 1 })
    countryId?: number;

    public toCommand(id: number): UpdateNewsCommand {
        const cmd = new UpdateNewsCommand();
        cmd.id = id;
        cmd.title = this.title;
        cmd.image = this.image;
        cmd.date = this.date ? new Date(this.date) : undefined;
        cmd.content = this.content;
        cmd.categoryId = this.categoryId;
        cmd.countryId = this.countryId;
        return cmd;
    }
}
