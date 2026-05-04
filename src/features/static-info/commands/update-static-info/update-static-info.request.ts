import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateStaticInfoCommand } from './update-static-info.command';

export class UpdateStaticInfoRequest {
    @IsUrl()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false, example: 'https://apps.apple.com/app/wayu' })
    appStoreLink?: string;

    @IsUrl()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({ required: false, example: 'https://play.google.com/store/apps/wayu' })
    playMarketLink?: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @ApiProperty({ required: false, example: 'Biz haqimizda matn...' })
    aboutUs?: string;

    public toCommand(): UpdateStaticInfoCommand {
        const cmd = new UpdateStaticInfoCommand();
        cmd.appStoreLink = this.appStoreLink;
        cmd.playMarketLink = this.playMarketLink;
        cmd.aboutUs = this.aboutUs;
        return cmd;
    }
}
