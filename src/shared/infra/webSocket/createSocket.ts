import { Server as HttpServer } from "http";
import socketIo, { Server } from "socket.io";

export class WebSocket {
  public static create(activedServer: HttpServer): Server {
    return socketIo(activedServer, {
      handlePreflightRequest: WebSocket.handlePreflightRequest,
    });
  }
  public static handlePreflightRequest = (req: any, res: any): any => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  };
}
