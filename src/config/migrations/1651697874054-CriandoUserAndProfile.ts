import {MigrationInterface, QueryRunner} from "typeorm";

export class CriandoUserAndProfile1651697874054 implements MigrationInterface {
    name = 'CriandoUserAndProfile1651697874054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SMALLSERIAL NOT NULL, "perfilId" smallint NOT NULL, "nome" character varying(64) NOT NULL, "sobrenome" character varying(64) NOT NULL, "email" character varying(256) NOT NULL, "telefone" character varying(16) NOT NULL, "sexo" character varying(9) NOT NULL, "senha" character varying(1024) NOT NULL, "validado" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perfil" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_814c50101bf1675e1f691aad2c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_726aef211eec0c16da483d5d291" FOREIGN KEY ("perfilId") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_726aef211eec0c16da483d5d291"`);
        await queryRunner.query(`DROP TABLE "perfil"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
