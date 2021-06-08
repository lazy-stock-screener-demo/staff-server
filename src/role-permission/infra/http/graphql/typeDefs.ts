const rolePermissionTypeDefs = `
  type Query {
    role(roleName: String!): Role
    roles(offset: String!): [Role]
  }
  type Role {
    roleName: String!
  }
`;

export { rolePermissionTypeDefs };
