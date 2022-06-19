import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPersonalizationRelation1655604082714 implements MigrationInterface {
    name = 'AlterPersonalizationRelation1655604082714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_985ea68bb79630fd82a463d89c9"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ALTER COLUMN "personalizacaoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_985ea68bb79630fd82a463d89c9" FOREIGN KEY ("personalizacaoId") REFERENCES "personalizacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_985ea68bb79630fd82a463d89c9"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ALTER COLUMN "personalizacaoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_985ea68bb79630fd82a463d89c9" FOREIGN KEY ("personalizacaoId") REFERENCES "personalizacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
