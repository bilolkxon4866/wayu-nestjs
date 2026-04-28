import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777225184947 implements MigrationInterface {
    name = 'Wayu1777225184947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('active', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64) NOT NULL, "vacancyId" integer NOT NULL, "resume" character varying(128) NOT NULL, "status" "public"."applications_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_type_enum" AS ENUM('fulltime', 'parttime')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "address" character varying(128) NOT NULL, "description" text NOT NULL, "phoneNumber" character varying(16) NOT NULL, "type" "public"."vacancies_type_enum" NOT NULL, "salary" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_7de713d10acb1c986bc838e75b6" UNIQUE ("title"), CONSTRAINT "PK_5b0972921f5882f049f3aadd0ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "representatives" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fullname" character varying(64) NOT NULL, "image" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "resume" text NOT NULL, CONSTRAINT "PK_80e9af53802d5e0376d1ae8f68c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "city" character varying(64) NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "countryId" integer, "representativeId" integer, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "flag" character varying(64) NOT NULL, CONSTRAINT "UQ_f0ab39b0865e4939e37308fe0a7" UNIQUE ("title"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "content" text NOT NULL, "newsCategoryId" integer, "countryId" integer, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsTags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_6ee1951e12e570449bd176b8c8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "question" character varying(256) NOT NULL, "answer" character varying(512) NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqsTags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "faqsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_29fc5c50b4da5c14e329739c9c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_25cae3ff755adc0abe5ca284092" UNIQUE ("title"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usefullink" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_a650fe16bdc4a9dd00b621873cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staticInfo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "appStoreLink" character varying(128), "playMarketLink" character varying(128), "aboutUs" text NOT NULL, CONSTRAINT "PK_49418aee1c05b46f78ef29743b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sociallinks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_f6534477a7cc51f9f5ea9ca1e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."questions_status_enum" AS ENUM('pending', 'answered', 'repeated', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "question" character varying(2000) NOT NULL, "status" "public"."questions_status_enum" NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instagramPosts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying(256) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_bc93d216703a2fda21cbeca015b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying(256) NOT NULL, "description" text, "transactionId" character varying(64) NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "content" text NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying(128) NOT NULL, "eventcategoryId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eventcategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_98221da32d6226386b087ec894f" UNIQUE ("title"), CONSTRAINT "PK_b45a8800b8910d773afbfe4fa0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donations_paidby_enum" AS ENUM('payme', 'click', 'oson')`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(10,2) NOT NULL, "fullname" character varying(64) NOT NULL, "date" TIMESTAMP NOT NULL, "paidby" "public"."donations_paidby_enum" NOT NULL, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookCategories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_2556e7db3ce3525a0104f73e94b" UNIQUE ("title"), CONSTRAINT "PK_ea689f47d8e96f5545bcdb411b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "description" text, "file" character varying(256) NOT NULL, "pages" integer NOT NULL, "year" integer NOT NULL, "authorId" integer, "bookCategoryId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_11c91735b88837592a524662e69" FOREIGN KEY ("representativeId") REFERENCES "representatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "newsCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTags" ADD CONSTRAINT "FK_c15e3bc5da07ad136f046bfccfe" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTags" ADD CONSTRAINT "FK_6a3e1431f0059d7e07c983e941b" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_e2eb9ee9fbbcc7b0122693438bc" FOREIGN KEY ("faqsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_a91e2b80338307840e51d8522bc" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_b9e5b89dcbb4146ae5f20714347" FOREIGN KEY ("eventcategoryId") REFERENCES "eventcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_207aede9830e37ff111c153885c" FOREIGN KEY ("bookCategoryId") REFERENCES "bookCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_207aede9830e37ff111c153885c"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_b9e5b89dcbb4146ae5f20714347"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_a91e2b80338307840e51d8522bc"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_e2eb9ee9fbbcc7b0122693438bc"`);
        await queryRunner.query(`ALTER TABLE "newsTags" DROP CONSTRAINT "FK_6a3e1431f0059d7e07c983e941b"`);
        await queryRunner.query(`ALTER TABLE "newsTags" DROP CONSTRAINT "FK_c15e3bc5da07ad136f046bfccfe"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_11c91735b88837592a524662e69"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "bookCategories"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TYPE "public"."donations_paidby_enum"`);
        await queryRunner.query(`DROP TABLE "eventcategories"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "instagramPosts"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_status_enum"`);
        await queryRunner.query(`DROP TABLE "sociallinks"`);
        await queryRunner.query(`DROP TABLE "staticInfo"`);
        await queryRunner.query(`DROP TABLE "usefullink"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "faqsTags"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "newsTags"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "representatives"`);
        await queryRunner.query(`DROP TABLE "newsCategories"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_type_enum"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
    }

}
