import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777458467850 implements MigrationInterface {
    name = 'Wayu1777458467850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "newsCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "newsCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "newsCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
