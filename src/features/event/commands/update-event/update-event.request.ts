import { IsDateString, IsInt, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateEventCommand } from './update-event.command';

export class UpdateEventRequest {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: true })
    title?: string | undefined;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @ApiProperty({ required: true })
    content?: string | undefined;

    @IsOptional()
    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: true })
    image?: string | undefined;

    @IsOptional()
    @IsDateString()
    @ApiProperty({ required: true })
    date?: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: true })
    address?: string | undefined;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: true })
    categoryId?: number | undefined;


    public toCommand(id: number): UpdateEventCommand {
        const cmd = new UpdateEventCommand();
        cmd.id = id;
        if (this.title !== undefined) cmd.title = this.title;
        if (this.content !== undefined) cmd.content = this.content;
        if (this.image !== undefined) cmd.image = this.image;
        if (this.date !== undefined) cmd.date = this.date;
        if (this.address !== undefined) cmd.address = this.address;
        if (this.categoryId !== undefined) cmd.categoryId = this.categoryId;
        return cmd;
    }
}
