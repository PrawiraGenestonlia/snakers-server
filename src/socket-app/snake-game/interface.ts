export interface IGameInfo { [roomId: string]: IBoardInfo }
export interface ISocketInfo { [socketId: string]: string }

export interface IBoardInfo {
  players: Array<IPlayerInfo>,
  foodPosition: ICoordinates,
  gridSize: number,
  roomId: string
}

export interface IPlayerInfo {
  socketId: string,
  playerName: string,
  playerColor: string,
  playerPosition: ICoordinates,
  playerVelocity: ICoordinates,
  playerSnake: Array<ICoordinates>,
}

export interface ICoordinates {
  x: number,
  y: number
}

export interface INewPlayer {
  roomId?: string,
  playerName: string,
  playerColor: string,
}