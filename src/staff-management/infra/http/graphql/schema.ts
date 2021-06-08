import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "graphql-tools";
import { staffTypeDefs } from "./typeDefs";
import { staffResolver } from "./resolvers";
const typeDefs = [staffTypeDefs];

const resolvers = [staffResolver];

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

export { schema };
