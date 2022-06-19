import {MigrationInterface, QueryRunner} from "typeorm";

export class ColorBeNullable1655607782689 implements MigrationInterface {
    name = 'ColorBeNullable1655607782689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personalizacao" ALTER COLUMN "cor" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personalizacao" ALTER COLUMN "cor" SET NOT NULL`);
    }

}
