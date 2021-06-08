import "dotenv/config";
import http from "http";
import app from "./shared/infra/http/app";
import activateSocketIo from "./shared/infra/webSocket/webSocket";
import { GraphQLServer } from "./shared/infra/http/graphql/apollo";

// Enable Repository
import "./shared/infra/repos/sequelize";

// Enable Subscriptions
import "./staff-management/application/subscriptions";

// Enable apollo server
GraphQLServer(app);

// Start Server
const activedServer = http.createServer(app).listen(process.env.PORT, () => {
  console.log(
    `[API Service]: Role API Service listening on port ${process.env.PORT}!`
  );
});

// Enable Websocket
activateSocketIo(activedServer, app).listen(activedServer);

// test socket is connected
// curl "http://localhost:3000/socket.io/?EIO=4&transport=polling"
