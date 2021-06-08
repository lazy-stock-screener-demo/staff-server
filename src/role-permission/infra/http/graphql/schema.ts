import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "graphql-tools";
import { rolePermissionTypeDefs } from "./typeDefs";
import { rolePermissionResolver } from "./resolvers";
const typeDefs = [rolePermissionTypeDefs];

const resolvers = [rolePermissionResolver];

const combinedSchema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

export { combinedSchema };
