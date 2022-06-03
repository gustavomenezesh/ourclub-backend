import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateImage1654297601563 implements MigrationInterface {
    name = 'CreateImage1654297601563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "imagem" ("id" SMALLSERIAL NOT NULL, "url" character varying(140) NOT NULL, "token" text NOT NULL, "tamanho" character varying(10) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7ee30edd85bb84d644b88ac624f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "imagem"`);
    }

}
