import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777291403040 implements MigrationInterface {
    name = 'Wayu1777291403040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usefullink" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "newsCategories" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "representatives" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "countries" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "news" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "newsTags" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "faqs" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "staticInfo" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sociallinks" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "instagramPosts" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "eventcategories" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "donations" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "author" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bookCategories" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "bookCategories" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "eventcategories" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "instagramPosts" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "sociallinks" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "staticInfo" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "faqs" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "newsTags" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "countries" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "representatives" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "newsCategories" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "usefullink" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updateAt"`);
    }

}
