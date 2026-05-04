import { IsDateString, IsInt, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEventCommand } from './create-event.command';

export class CreateEventRequest {
    @IsString()
    @MinLength(3)
    @ApiProperty({ required: false })
    title!: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({ required: false })
    content!: string;

    @IsUrl()
    @MaxLength(128)
    @ApiProperty({ required: false })
    image!: string;

    @IsDateString()
    @ApiProperty({ required: false })
    date!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty({ required: false })
    address!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false })
    categoryId!: number;


    public toCommand(): CreateEventCommand {
        const cmd = new CreateEventCommand();
        cmd.title = this.title;
        cmd.content = this.content;
        cmd.image = this.image;
        cmd.date = this.date;
        cmd.address = this.address;
        cmd.categoryId = this.categoryId;
        return cmd;
    }
}
