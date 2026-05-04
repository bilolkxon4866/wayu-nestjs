import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777386562466 implements MigrationInterface {
    name = 'Wayu1777386562466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "categoryId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "categoryId"`);
    }

}
