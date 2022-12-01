import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionDB1655657278376 implements MigrationInterface {
    name = 'NewVersionDB1655657278376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tamanho" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_015fc2ce91ccc072219d3f22f51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "imagem" ("id" SMALLSERIAL NOT NULL, "produtoId" smallint NOT NULL, "url" character varying(140) NOT NULL, "token" text NOT NULL, "tamanho" character varying(32) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7ee30edd85bb84d644b88ac624f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategoria" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "categoriaId" smallint NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f7a967c250a2dea2005c4432b70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id" SMALLSERIAL NOT NULL, "subcategoriaId" smallint NOT NULL, "titulo" character varying(64) NOT NULL, "valor" numeric(6,2) NOT NULL, "descricao" character varying(1024) NOT NULL, "genero" character varying(9) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personalizacao" ("id" SMALLSERIAL NOT NULL, "nome" character varying(64) NOT NULL, "numero" character varying(6) NOT NULL, "cor" character varying(14), "valor" double precision NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_09d9c8b3086cdd0a0ceeae3e7c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendaProduto" ("id" SMALLSERIAL NOT NULL, "vendaId" smallint NOT NULL, "produtoId" smallint NOT NULL, "tamanhoId" smallint NOT NULL, "personalizacaoId" smallint, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eda6016bb9040057b5b58de2535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venda" ("id" SMALLSERIAL NOT NULL, "usuarioId" smallint NOT NULL, "enderecoId" smallint NOT NULL, "descricao" character varying(1024) NOT NULL, "codigo" character varying(64) NOT NULL, "total" numeric(6,2) NOT NULL, "formaPagamento" character varying(32) NOT NULL, "pagamentoConfirmado" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e54dc36860bef073e9ab638b444" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perfil" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(64) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_814c50101bf1675e1f691aad2c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SMALLSERIAL NOT NULL, "perfilId" smallint NOT NULL, "nome" character varying(64) NOT NULL, "sobrenome" character varying(64) NOT NULL, "email" character varying(256) NOT NULL, "telefone" character varying(16) NOT NULL, "sexo" character varying(9) NOT NULL, "senha" character varying(1024) NOT NULL, "validado" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "endereco" ("id" SMALLSERIAL NOT NULL, "usuarioId" smallint NOT NULL, "estado" character varying(20) NOT NULL, "cep" character varying(8) NOT NULL, "cidade" character varying(64) NOT NULL, "logradouro" character varying(128) NOT NULL, "bairro" character varying(64) NOT NULL, "numero" character varying(5) NOT NULL, "complemento" character varying(64), "principal" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SMALLSERIAL NOT NULL, "descricao" character varying(20) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "imagem" ADD CONSTRAINT "FK_7e9f60910f013a40e6211be12a5" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategoria" ADD CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_53111fa16ad324df436cba69dc1" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_3021d7b785be3ce61d55c9eea94" FOREIGN KEY ("vendaId") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_804e813639fa95800dabf98357e" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_17fdf2b1b492c6481f660300613" FOREIGN KEY ("tamanhoId") REFERENCES "tamanho"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" ADD CONSTRAINT "FK_985ea68bb79630fd82a463d89c9" FOREIGN KEY ("personalizacaoId") REFERENCES "personalizacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_fd83d651fb05d24bc1e97c4cff6" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_36085b40429f3f7cd6f2aa06d7c" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_726aef211eec0c16da483d5d291" FOREIGN KEY ("perfilId") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "endereco" ADD CONSTRAINT "FK_82bec04bb9fadadad0a33cb0c43" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" DROP CONSTRAINT "FK_82bec04bb9fadadad0a33cb0c43"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_726aef211eec0c16da483d5d291"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_36085b40429f3f7cd6f2aa06d7c"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_fd83d651fb05d24bc1e97c4cff6"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_985ea68bb79630fd82a463d89c9"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_17fdf2b1b492c6481f660300613"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_804e813639fa95800dabf98357e"`);
        await queryRunner.query(`ALTER TABLE "vendaProduto" DROP CONSTRAINT "FK_3021d7b785be3ce61d55c9eea94"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_53111fa16ad324df436cba69dc1"`);
        await queryRunner.query(`ALTER TABLE "subcategoria" DROP CONSTRAINT "FK_e3cc887e6961ff4f9e3e34b29da"`);
        await queryRunner.query(`ALTER TABLE "imagem" DROP CONSTRAINT "FK_7e9f60910f013a40e6211be12a5"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "perfil"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TABLE "vendaProduto"`);
        await queryRunner.query(`DROP TABLE "personalizacao"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "subcategoria"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "imagem"`);
        await queryRunner.query(`DROP TABLE "tamanho"`);
    }

}
