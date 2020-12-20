import './pre-start'; // Must be the first import
import { app } from './server';
import logger from './shared/Logger';
import http from 'http';
import { Server } from 'socket.io';

const server = new http.Server(app);
export const io = new Server(server);

// Start the server
const port = Number(process.env.PORT || 8080);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
