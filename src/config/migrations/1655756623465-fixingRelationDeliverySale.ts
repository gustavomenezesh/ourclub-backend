import {MigrationInterface, QueryRunner} from "typeorm";

export class fixingRelationDeliverySale1655756623465 implements MigrationInterface {
    name = 'fixingRelationDeliverySale1655756623465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrega" DROP CONSTRAINT "FK_5c8ea73125e3003237092d6cac0"`);
        await queryRunner.query(`ALTER TABLE "entrega" ADD CONSTRAINT "UQ_5c8ea73125e3003237092d6cac0" UNIQUE ("vendaId")`);
        await queryRunner.query(`ALTER TABLE "entrega" ADD CONSTRAINT "FK_5c8ea73125e3003237092d6cac0" FOREIGN KEY ("vendaId") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrega" DROP CONSTRAINT "FK_5c8ea73125e3003237092d6cac0"`);
        await queryRunner.query(`ALTER TABLE "entrega" DROP CONSTRAINT "UQ_5c8ea73125e3003237092d6cac0"`);
        await queryRunner.query(`ALTER TABLE "entrega" ADD CONSTRAINT "FK_5c8ea73125e3003237092d6cac0" FOREIGN KEY ("vendaId") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
