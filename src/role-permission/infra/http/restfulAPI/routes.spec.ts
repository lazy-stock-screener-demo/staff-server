import supertest from "supertest";
import { expect } from "chai";
import app from "../../../../shared/infra/http/app";

const server = app.listen(process.env.TEST_PORT, () => {
  console.log(
    `[Test API Service]: Test API Service listening on port ${process.env.TEST_PORT}!`
  );
});
const request = supertest(server);

const data = {
  roles: [],
  role: {},
};

describe("System Test: /v1/role-permission/roles", () => {
  describe("GET /roles?offset=0", async () => {
    xit("Given a offset, should return a list of role", async () => {
      const res = await request
        .get("/v1/role-permission/roles")
        .query({ offset: 0 })
        .expect(200);
      expect(res.body.roles.length).to.eql(6);
    });
  });
});

describe("System Test: /v1/role-permission/role", () => {
  describe("POST /role", async () => {
    it("Given a roleName, should create this role and return a OK", async () => {
      const res = await request
        .post("/v1/role-permission/role")
        .send({ data: { roleName: "test_admin" } })
        .expect(200);
      expect(res.body.role).to.deep.include({
        roleName: "test_admin",
        isEnabled: true,
      });
      data.role = res.body.role;
    });
  });

  describe("GET /role/:roleVID", async () => {
    it("Given a roleName, should return a role", async () => {
      const res = await request
        .get(`/v1/role-permission/role/${data.role["roleVID"]}`)
        .expect(200);
      expect(res.body.role).to.deep.include({
        roleName: "test_admin",
        isEnabled: true,
      });
    });
  });

  describe("PUT /role/:roleVID", async () => {
    it("Given a roleName, should return a role", async () => {
      const res = await request
        .put(`/v1/role-permission/role/${data.role["roleVID"]}`)
        .send({ data: { newRoleName: "new_test_admin" } })
        .expect(200);
      expect(res.body.role).to.deep.include({
        roleName: "new_test_admin",
        isEnabled: true,
      });
    });
  });

  describe("DELETE /role", async () => {
    it("Given a roleName, should return a role", async () => {
      const res = await request
        .delete(`/v1/role-permission/role/${data.role["roleVID"]}`)
        .expect(200);
    });
  });
  after(() => {
    server.close();
  });
});
