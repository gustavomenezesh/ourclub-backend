import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSize1654003519366 implements MigrationInterface {
    name = 'CreateSize1654003519366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tamanho" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_015fc2ce91ccc072219d3f22f51" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tamanho"`);
    }

}
