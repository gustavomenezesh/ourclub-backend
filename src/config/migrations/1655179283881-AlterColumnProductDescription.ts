import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnProductDescription1655179283881 implements MigrationInterface {
    name = 'AlterColumnProductDescription1655179283881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produto" ADD "descricao" character varying(1024) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produto" ADD "descricao" character varying(64) NOT NULL`);
    }

}
