import './pre-start'; // Must be the first import
import { app } from './server';
import logger from './shared/Logger';
import http from 'http';
import { Server } from 'socket.io';
import { SnakeSocket } from './socket-app/snake-game';

const server = new http.Server(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export const socketio = new SnakeSocket(io);

// Start the server
const port = Number(process.env.PORT || 8080);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
