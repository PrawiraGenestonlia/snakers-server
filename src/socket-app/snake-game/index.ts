import { Socket } from 'socket.io';
import { io } from '../../index';
import { gameInfo } from './game-info';

io.on('snake-game', (socket: Socket) => {
  // either with send()
  socket.send('Hello!');

  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  gameInfo(socket);

});