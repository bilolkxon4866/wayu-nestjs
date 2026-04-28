import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: ['dist/**/*.entity.js'],
    synchronize: false
}