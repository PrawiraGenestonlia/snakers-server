import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { IStatus, IRoutes } from './server-status.interface'
import { ServerStatusService } from './server-status.service';

const ServerStatus = new ServerStatusService();

@Tags("Server Status")
@Route("/api/server-status")
export class ServerStatusController extends Controller {

  @Get("/")
  public async get(): Promise<IStatus> {
    return ServerStatus.get();
  }

  @Get("/routes")
  public async getRoutes(): Promise<IRoutes> {
    return ServerStatus.getAllRoutes();
  }

}