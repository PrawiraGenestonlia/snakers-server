import { Socket } from 'socket.io';

export const gameInfo = (socket: Socket) => {

  // handle the event sent with socket.send()
  socket.on('message', (data: any) => {
    // console.log(data);
  });

}