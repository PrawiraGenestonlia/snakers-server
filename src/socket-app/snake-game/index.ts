import { Socket, Server } from 'socket.io';
import { generateRoomId } from '../../utils/generateRoomId';
import { getRandomInt } from '../../utils/generateRandomInt';
import { IGameInfo, INewPlayer, IPlayerInfo, ISocketInfo } from './interface';

const GRID_SIZE = 200;

export class SnakeSocket {

  private roomId: Set<string> = new Set([]);
  private gameInfo: IGameInfo = {};
  private userRoomId: ISocketInfo = {};

  constructor(io: Server) {

    io.on('connection', (socket: Socket) => {

      this.userRoomId[socket['id']] = '';

      const handleDisconnect = (): void => {
        if (this.gameInfo[this.userRoomId[socket['id']]]) {
          this.gameInfo[this.userRoomId[socket['id']]].players =
            this.gameInfo[this.userRoomId[socket['id']]]
              .players
              .filter(player => {
                if (player['socketId'] !== socket['id']) {
                  return player
                }
              });
          if (this.gameInfo[this.userRoomId[socket['id']]].players.length === 0) {
            delete this.gameInfo[socket['id']];
            this.roomId.delete(this.userRoomId[socket['id']]);
          }
        }
        delete this.userRoomId[socket['id']];
      }

      const handleRegisterGame = (userInfo: INewPlayer): void => {

        try {

          let newRoomId: string;
          if (userInfo.roomId) {
            if (!this.roomId.has(userInfo.roomId)) {
              throw new Error("room id not found!");
            } else {
              newRoomId = userInfo.roomId;
            }
          } else {
            newRoomId = generateRoomId([...this.roomId]);
            this.roomId.add(newRoomId);
          }

          this.userRoomId[socket['id']] = newRoomId;

          const newPlayer: IPlayerInfo = {
            socketId: socket['id'],
            playerName: userInfo.playerName,
            playerColor: userInfo.playerColor,
            playerPosition: {
              x: 0,
              y: 0,
            },
            playerVelocity: {
              x: 0,
              y: 0,
            },
            playerSnake: [{
              x: 0,
              y: 0,
            }]
          }

          if (this.gameInfo[newRoomId]) {
            this.gameInfo[newRoomId]['players'].push(newPlayer);
          } else {
            this.gameInfo[newRoomId] = {
              players: [newPlayer],
              foodPosition: { x: 0, y: 0 },
              gridSize: GRID_SIZE,
              roomId: newRoomId
            };
          }

          socket.emit('game-info', this.gameInfo[newRoomId]);

          setInterval(() => {
            socket.emit('game-info', this.gameInfo[newRoomId]);
          }, 1000);

        } catch (e) {
          const errMessage: string = e.message;
          socket.emit("error", errMessage);
        }
      }

      const handleStartGame = (roomId: string) => {
        try {
          console.log(roomId);
        } catch (e) {
          const errMessage: string = e.message;
          socket.emit("error", errMessage);
        }
      }

      socket.on('rooms', () => { socket.emit('rooms', [...this.roomId]) });
      socket.on('disconnect', handleDisconnect);
      socket.on('register-game', handleRegisterGame);
      socket.on('start-game', handleStartGame);

    });

  }

  public getInfo() {
    return {
      roomId: [...this.roomId],
      gameInfo: this.gameInfo,
      userRoomId: this.userRoomId,
    }
  }

  public getRoomInfo(roomId: string) {
    return this.gameInfo[roomId]
  }

}