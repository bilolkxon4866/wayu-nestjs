import {Allow, IsDateString, IsInt, IsOptional, IsString, IsUrl, MaxLength, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateNewsCommand } from './create-news.command';

export class CreateNewsRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @Allow()
    @ApiProperty({ type: "string", format: "binary" })
    image!: string;

    @IsDateString()
    @ApiProperty()
    date!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty()
    content!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty()
    countryId?: number;

    public toCommand(): CreateNewsCommand {
        const cmd = new CreateNewsCommand();
        cmd.title = this.title;
        cmd.image = this.image;
        cmd.date = new Date(this.date);
        cmd.content = this.content;
        cmd.categoryId = this.categoryId;
        cmd.countryId = this.countryId;
        return cmd;
    }
}
