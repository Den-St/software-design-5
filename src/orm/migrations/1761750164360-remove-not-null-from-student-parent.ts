import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeNotNullFromStudentParent1761750164360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adjust table/column names as needed
    await queryRunner.query(`
            ALTER TABLE "students"
            ALTER COLUMN "parent_id" DROP NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "students"
            ALTER COLUMN "parent_id" SET NOT NULL;
        `);
  }
}
