import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStaticInfoCommand } from './update-static-info.command';
import {StaticInfoEntity} from "../../staticInfo.entity";

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
    async execute(cmd: UpdateStaticInfoCommand): Promise<void> {
        // Bitta yozuv bo'ladi — topilmasa yaratamiz (upsert)
        let staticInfo = await StaticInfoEntity.findOne({ where: {} });

        if (!staticInfo) {
            staticInfo = StaticInfoEntity.create({
                appStoreLink: cmd.appStoreLink,
                playMarketLink: cmd.playMarketLink,
                aboutUs: cmd.aboutUs,
            } as StaticInfoEntity);
        } else {
            if (cmd.appStoreLink !== undefined) staticInfo.appStoreLink = cmd.appStoreLink;
            if (cmd.playMarketLink !== undefined) staticInfo.playMarketLink = cmd.playMarketLink;
            if (cmd.aboutUs !== undefined) staticInfo.aboutUs = cmd.aboutUs;
        }

        await StaticInfoEntity.save(staticInfo);
    }
}
