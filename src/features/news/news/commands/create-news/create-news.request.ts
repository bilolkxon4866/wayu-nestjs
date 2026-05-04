import { IsDateString, IsInt, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateNewsCommand } from './create-news.command';

export class CreateNewsRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty({ required: false })
    title!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image!: string;

    @IsDateString()
    @ApiProperty({ required: false })
    date!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({ required: false })
    content!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false })
    categoryId!: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false })
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
