import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingRelationCategoryAndSub1654147478550 implements MigrationInterface {
    name = 'CreatingRelationCategoryAndSub1654147478550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD "categoriaId" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "PK_f7a967c250a2dea2005c4432b70"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "PK_2ad56db1d8873a84b081e2bb925" PRIMARY KEY ("id", "categoriaId")`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "PK_2ad56db1d8873a84b081e2bb925"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "PK_f7a967c250a2dea2005c4432b70" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP COLUMN "categoriaId"`);
    }

}
