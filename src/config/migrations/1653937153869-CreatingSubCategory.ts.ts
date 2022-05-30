import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingSubCategory.ts1653937153869 implements MigrationInterface {
    name = 'CreatingSubCategory.ts1653937153869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategoria" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f7a967c250a2dea2005c4432b70" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subcategoria"`);
    }

}
