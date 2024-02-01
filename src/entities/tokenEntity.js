const { getConnection, Table } = require('typeorm');

const tokenEntity = async () => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const tableExists = await queryRunner.hasTable('token');

    if (!tableExists) {
        await queryRunner.createTable(new Table({
            name: 'token',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userId', // Cambiar el nombre de la columna
                    type: 'int',    // Cambiar el tipo de datos si es necesario
                    isNullable: false,
                },
                {
                    name: 'accessToken',
                    type: 'varchar',
                    length: '150',
                    isNullable: false
                },
                {
                    name: 'createAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updateAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: true,
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'], // Cambiar el nombre de la columna
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'], // Referenciar la columna de la tabla users
                    onDelete: 'CASCADE',
                },
            ]
        }));
    }

    await queryRunner.release();
};

module.exports = { tokenEntity };