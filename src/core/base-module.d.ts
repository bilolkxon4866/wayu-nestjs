import { BaseEntity } from "typeorm";
export declare class BaseModule extends BaseEntity {
    id: number;
    createdAt: string;
    updateAt?: string;
}
