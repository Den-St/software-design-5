import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateParentsAndStudents1759863216890 implements MigrationInterface {
  name = 'CreateParentsAndStudents1759863216890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "students" (
                "id" SERIAL NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50) NOT NULL,
                "birth_date" date NOT NULL,
                "phone" character varying(20) NOT NULL,
                "parent_id" integer,
                CONSTRAINT "UQ_317b86154bca256bdf5432f134c" UNIQUE ("phone"),
                CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "parents" (
                "id" SERIAL NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50) NOT NULL,
                "phone" character varying(20) NOT NULL,
                "email" character varying(100) NOT NULL,
                CONSTRAINT "UQ_fc60e6197aa92fb4aed997cadd8" UNIQUE ("phone"),
                CONSTRAINT "UQ_07b4151ae2a983823d922d5cf03" UNIQUE ("email"),
                CONSTRAINT "PK_9a4dc67c7b8e6a9cb918938d353" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "students"
            ADD CONSTRAINT "FK_209313beb8d3f51f7ad69214d90" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "students" DROP CONSTRAINT "FK_209313beb8d3f51f7ad69214d90"
        `);
    await queryRunner.query(`
            DROP TABLE "parents"
        `);
    await queryRunner.query(`
            DROP TABLE "students"
        `);
  }
}
