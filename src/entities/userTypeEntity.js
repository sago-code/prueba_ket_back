const { getConnection, Table } = require('typeorm');

async function userTypeEntity() {
    const connection = getConnection();

    const queryRunner = connection.createQueryRunner();
    const tableExists = await queryRunner.hasTable('userType');

    if (!tableExists) {
        await queryRunner.createTable(new Table({
            name: 'userType',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userTypeName',
                    type: 'varchar',
                    length: '50',
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
        }));
    }

    await queryRunner.release();
}

module.exports = {
    userTypeEntity
};
