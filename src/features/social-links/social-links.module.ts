import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SocialLinksController } from './social-links.controller';
import { CreateSocialLinksHandler } from './commands/create-social-links/create-social-links.handler';
import { UpdateSocialLinksHandler } from './commands/update-social-links/update-social-links.handler';
import { DeleteSocialLinksHandler } from './commands/delete-social-links/delete-social-links.handler';
import { GetAllSocialLinksHandler } from './queries/get-all-social-links/get-all-social-links.handler';
import { GetOneSocialLinksHandler } from './queries/get-one-social-links/get-one-social-links.handler';

@Module({
    imports: [CqrsModule],
    controllers: [SocialLinksController],
    providers: [
        CreateSocialLinksHandler,
        UpdateSocialLinksHandler,
        DeleteSocialLinksHandler,
        GetAllSocialLinksHandler,
        GetOneSocialLinksHandler,
    ],
})
export class SocialLinksModule {}
