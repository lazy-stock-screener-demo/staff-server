import { ApolloServer } from "apollo-server-express";
import { combinedSchema } from "../../../../role-permission/infra/http/graphql/schema";

const server = new ApolloServer({
  introspection: true,
  playground: { settings: { "request.credentials": "include" } },
  schema: combinedSchema,
  uploads: false,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message,
    };
  },
  context: ({ req, res }) => {
    if (req) {
      return {
        req,
        res,
      };
    }
  },
});

export function GraphQLServer(app) {
  server.applyMiddleware({ app, path: "/graphql/v1" });
  console.log(
    `[GraphQL Service]: Role Apollo Service listening on path /graphql/v1!`
  );
}
