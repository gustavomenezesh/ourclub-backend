import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingAdress1653671542306 implements MigrationInterface {
    name = 'CreatingAdress1653671542306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" SMALLSERIAL NOT NULL, "usuarioId" smallint NOT NULL, "estado" character varying(20) NOT NULL, "cep" character varying(8) NOT NULL, "cidade" character varying(64) NOT NULL, "logradouro" character varying(128) NOT NULL, "bairro" character varying(64) NOT NULL, "numero" character varying(5) NOT NULL, "complemento" character varying(64), "principal" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "endereco" ADD CONSTRAINT "FK_82bec04bb9fadadad0a33cb0c43" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" DROP CONSTRAINT "FK_82bec04bb9fadadad0a33cb0c43"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
