import {Column, Entity} from "typeorm";
import {BaseModule} from "../../core/base-module";

@Entity('instagramPosts')
export class InstagramPostsEntity  extends BaseModule{
    @Column({type: 'varchar', length: 256})
    image!: string

    @Column({type: 'varchar', length: 128})
    link!: string
}