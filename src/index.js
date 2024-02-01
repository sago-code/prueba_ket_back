const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const { connect } = require('../src/database');

app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/routes'));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

connect().then(() => {
    httpServer.listen(app.get('port'), () => {
        console.log('Servidor en el puerto', app.get('port'));
    });
}).catch(error => {
    console.error('Error al conectar a la base de datos:', error);
});