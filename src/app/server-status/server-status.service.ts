import { app } from '../../server';
import { IStatus, IRoutes } from './server-status.interface';
import { socketio } from '../../index';
export class ServerStatusService {

  public async get(): Promise<IStatus> {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          message: "healthy"
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  public async getAllRoutes(): Promise<IRoutes> {
    return new Promise((resolve, reject) => {
      const routes: Array<string> = [];
      app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
          routes.push(r.route.path);
        }
      });
      if (routes.length) {
        resolve({
          routes: [...routes]
        });
      } else {
        reject(new Error("No routes are found!"));
      }
    })
  }

  public async getSnakeGameServerMemory(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ...socketio.getInfo()
        })
      } catch (err) {
        reject(err)
      }
    })
  }

}