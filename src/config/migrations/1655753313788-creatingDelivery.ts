import {MigrationInterface, QueryRunner} from "typeorm";

export class creatingDelivery1655753313788 implements MigrationInterface {
    name = 'creatingDelivery1655753313788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entrega" ("id" SMALLSERIAL NOT NULL, "vendaId" smallint NOT NULL, "valor" double precision NOT NULL, "prazo" character varying(10) NOT NULL, "rastreio" character varying(40), "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_08dc1bf27c6ceca109fe101071f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD "quantity" smallint`);
        await queryRunner.query(`ALTER TABLE "entrega" ADD CONSTRAINT "FK_5c8ea73125e3003237092d6cac0" FOREIGN KEY ("vendaId") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrega" DROP CONSTRAINT "FK_5c8ea73125e3003237092d6cac0"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP COLUMN "quantity"`);
        await queryRunner.query(`DROP TABLE "entrega"`);
    }

}
