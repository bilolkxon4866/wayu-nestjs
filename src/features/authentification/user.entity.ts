import {Column, Entity} from 'typeorm';
import {Role} from "../../core/enum/enum";
import {BaseModule} from "../../core/base-module";

@Entity('users')
export class User extends BaseModule {
    @Column({type: 'enum', enum: Role, default: 'admin'})
    role!: Role;

    @Column({length: 64,unique: true})
    userName!: string

    @Column({length: 64})
    fullName!: string;

    @Column({length: 128})
    password!: string;

    @Column({type: 'date', nullable: true})
    birthDate?: string;

    @Column({default: false})
    isVerified!: boolean;

    @Column({default: false})
    isActive!: boolean;
}