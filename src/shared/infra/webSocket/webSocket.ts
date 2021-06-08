import expressStatusMonitor from "express-status-monitor";

function EmitEventToClient(socket) {
  socket.emit("FromAPI", "123123123123");
}

function initSocketIo(activedServer) {
  // console.log(
  //   `[Socket On]: Socket Service is listening ${process.env.WEBSOCKET_PORT}`
  // );
  // const server = require("http").createServer();
  return require("socket.io")(activedServer, {
    handlePreflightRequest: (req, res) => {
      console.log("here");
      const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true,
      };
      res.writeHead(200, headers);
      res.end();
    },
  });
}

function bindEventOnIo(io) {
  let interval;
  io.on("connection", (socket) => {
    console.log(`[Socket Connect]`);
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => EmitEventToClient(socket), 1000);
    socket.on("disconnect", () => {
      console.log("[Socket Disconnect]");
    });
  });
  return io;
}

const activateSocketIo = (activedServer, app) => {
  const io = initSocketIo(activedServer);
  app.use(
    expressStatusMonitor({
      websocket: io,
      port: app.get(process.env.SOCKETIO_PORT),
    })
  );
  return bindEventOnIo(io);
};

export default activateSocketIo;
