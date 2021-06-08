import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { WebSocket } from "./createSocket";

export class AfterSocketOn {
  private io: Server;
  constructor(activedServer: HttpServer) {
    this.io = WebSocket.create(activedServer);
    this.socketConnection(this.io);
  }
  public socketConnection(io: Server): void {
    io.on("connection", this.socketListener);
  }
  public subscriptSocket(): void {}
  public socketListener(socket: Server) {
    console.log(`[Socket On]: Socket Service listening on port`);
    socket.emit("FromAPI", "123123123123");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
}
