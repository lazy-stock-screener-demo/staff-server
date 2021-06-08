const staffTypeDefs = `
  type Query {
    dummy: String
  }
  type Staff {
    staffname: String
  }
  input CreateStaffArgument{
    id: String
  }
  type Mutations {
    createStaff(input: CreateStaffArgument!): Staff
  }
`;

export { staffTypeDefs };
