import { Command } from '@nestjs/cqrs';

export class UpdateStaticInfoCommand extends Command<void> {
    appStoreLink?: string;
    playMarketLink?: string;
    aboutUs?: string;
}
