import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePersonalizationTable1655576214498 implements MigrationInterface {
    name = 'CreatePersonalizationTable1655576214498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personalizacao" ("id" SMALLSERIAL NOT NULL, "nome" character varying(64) NOT NULL, "numero" character varying(6) NOT NULL, "cor" character varying(14) NOT NULL, "valor" double precision NOT NULL, "produtoId" smallint NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_09d9c8b3086cdd0a0ceeae3e7c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personalizacao" ADD CONSTRAINT "FK_fc29a30d9cfb6b80c7e73e2006b" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personalizacao" DROP CONSTRAINT "FK_fc29a30d9cfb6b80c7e73e2006b"`);
        await queryRunner.query(`DROP TABLE "personalizacao"`);
    }

}
