import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1700000000000 implements MigrationInterface {
    name = 'CreateInitialTables1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "quizz" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                CONSTRAINT "PK_quizz_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TYPE "public"."question_type_enum" AS ENUM('boolean', 'input', 'checkbox')
        `);

        await queryRunner.query(`
            CREATE TABLE "question" (
                "id" SERIAL NOT NULL,
                "question" character varying NOT NULL,
                "type" "public"."question_type_enum" NOT NULL DEFAULT 'boolean',
                "quizzId" integer NOT NULL,
                CONSTRAINT "PK_question_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "answer" (
                "id" SERIAL NOT NULL,
                "answer" character varying NOT NULL,
                "isCorrect" boolean NOT NULL,
                "questionId" integer NOT NULL,
                CONSTRAINT "PK_answer_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "question" 
            ADD CONSTRAINT "FK_question_quizz" 
            FOREIGN KEY ("quizzId") REFERENCES "quizz"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "answer" 
            ADD CONSTRAINT "FK_answer_question" 
            FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_answer_question"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_question_quizz"`);

        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "quizz"`);
    }
}
