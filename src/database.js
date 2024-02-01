const { createConnection } = require('typeorm');

// Importa las funciones que crean las tablas si no existen
const { usersEntity } = require('./entities/usersEntity');
const { userTypeEntity } = require('./entities/usertypeEntity');
const { tokenEntity } = require('./entities/tokenEntity');

async function connect() {
    const connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'schoolclassvirtual',
        synchronize: true,
        entities: [] // Dejamos esta lista vacía ya que las tablas se crearán manualmente
    });

    // Llama a las funciones para crear las tablas si no existen
    await usersEntity();
    await userTypeEntity();
    await tokenEntity();

    console.log('DB connected');
    return connection;
}

module.exports = {
    connect
};

