import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductTable1655178410430 implements MigrationInterface {
    name = 'CreateProductTable1655178410430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produto" ("id" SMALLSERIAL NOT NULL, "subcategoriaId" smallint NOT NULL, "titulo" character varying(64) NOT NULL, "valor" numeric(6,2) NOT NULL, "descricao" character varying(64) NOT NULL, "genero" character varying(9) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "imagem" ADD "produtoId" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "imagem" DROP COLUMN "tamanho"`);
        await queryRunner.query(`ALTER TABLE "imagem" ADD "tamanho" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "PK_2ad56db1d8873a84b081e2bb925"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "PK_f7a967c250a2dea2005c4432b70" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "imagem" ADD CONSTRAINT "FK_7e9f60910f013a40e6211be12a5" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_53111fa16ad324df436cba69dc1" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_53111fa16ad324df436cba69dc1"`);
        await queryRunner.query(`ALTER TABLE "imagem" DROP CONSTRAINT "FK_7e9f60910f013a40e6211be12a5"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "PK_f7a967c250a2dea2005c4432b70"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "PK_2ad56db1d8873a84b081e2bb925" PRIMARY KEY ("id", "categoriaId")`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imagem" DROP COLUMN "tamanho"`);
        await queryRunner.query(`ALTER TABLE "imagem" ADD "tamanho" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "imagem" DROP COLUMN "produtoId"`);
        await queryRunner.query(`DROP TABLE "produto"`);
    }

}
