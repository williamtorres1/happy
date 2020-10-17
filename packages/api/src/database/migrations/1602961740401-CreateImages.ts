/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateImages1602961740401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'path', // nome e caminho que será salvo no banco de dados
            type: 'varchar',
          },
          {
            // relacionamento imagens -> orfanato
            name: 'orphanage_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'ImageOrphanage',
            columnNames: ['orphanage_id'],
            referencedTableName: 'orphanages',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE', // Manter o relacionamento de imagens com o orfanato, caso o ID mude
            onDelete: 'CASCADE', // Apagar todas as imagens, caso o orfanato seja deletado
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
