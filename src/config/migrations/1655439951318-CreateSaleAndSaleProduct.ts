import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSaleAndSaleProduct1655439951318 implements MigrationInterface {
    name = 'CreateSaleAndSaleProduct1655439951318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendaProduto" ("id" SMALLSERIAL NOT NULL, "vendaId" smallint NOT NULL, "produtoId" smallint NOT NULL, "tamanhoId" smallint NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eda6016bb9040057b5b58de2535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venda" ("id" SMALLSERIAL NOT NULL, "usuarioId" smallint NOT NULL, "enderecoId" smallint NOT NULL, "descricao" character varying(1024) NOT NULL, "codigo" character varying(64) NOT NULL, "total" numeric(6,2) NOT NULL, "formaPagamento" character varying(32) NOT NULL, "pagamentoConfirmado" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e54dc36860bef073e9ab638b444" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_3021d7b785be3ce61d55c9eea94" FOREIGN KEY ("vendaId") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_804e813639fa95800dabf98357e" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_17fdf2b1b492c6481f660300613" FOREIGN KEY ("tamanhoId") REFERENCES "tamanho"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_fd83d651fb05d24bc1e97c4cff6" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_36085b40429f3f7cd6f2aa06d7c" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_36085b40429f3f7cd6f2aa06d7c"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_fd83d651fb05d24bc1e97c4cff6"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_17fdf2b1b492c6481f660300613"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_804e813639fa95800dabf98357e"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_3021d7b785be3ce61d55c9eea94"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TABLE "vendaProduto"`);
    }

}
