const { getConnection, Table } = require('typeorm');

const usersEntity = async () => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const tableExists = await queryRunner.hasTable('users');

    if (!tableExists) {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '80',
                    isNullable: false,
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'userName',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'userTypeId',
                    type: 'int',
                    isNullable: false,
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
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userTypeId'],
                    referencedTableName: 'userType',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    await queryRunner.release();
};

module.exports = {
    usersEntity
};