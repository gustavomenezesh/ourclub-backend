import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPromotionTable1658185328071 implements MigrationInterface {
    name = 'AddPromotionTable1658185328071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promocao" ("id" SMALLSERIAL NOT NULL, "titulo" character varying(64) NOT NULL, "descricao" character varying(1024) NOT NULL, "codigo" character varying(64) NOT NULL, "valor" numeric(6,2) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3d23ec4f70f4b80e5f05c7e3132" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "promocao"`);
    }

}
