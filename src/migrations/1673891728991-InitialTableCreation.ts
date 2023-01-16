import { MigrationInterface,
    QueryRunner } from "typeorm"

export class InitialTableCreation1673891728991 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "campaigns" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "createdAt" datetime NOT NULL,
                "updatedAt" datetime NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "actors" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "description" varchar NOT NULL,
                "campaignId" integer NOT NULL,
                "actorType" varchar NOT NULL,
                "createdAt" datetime NOT NULL,
                "updatedAt" datetime NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "campaignId" integer NOT NULL,
                "description" varchar NOT NULL,
                "createdAt" datetime NOT NULL,
                "updatedAt" datetime NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "locations" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "campaignId" integer NOT NULL,
                "description" varchar NOT NULL,
                "createdAt" datetime NOT NULL,
                "updatedAt" datetime NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "message" varchar NOT NULL,
                "actorId" integer NOT NULL,
                "conversationId" integer NOT NULL,
                "createdAt" datetime NOT NULL,
                "updatedAt" datetime NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actors";`);
        await queryRunner.query(`DROP TABLE "campaigns";`);
        await queryRunner.query(`DROP TABLE "conversations";`);
        await queryRunner.query(`DROP TABLE "locations";`);
        await queryRunner.query(`DROP TABLE "messages";`);
    }
}
