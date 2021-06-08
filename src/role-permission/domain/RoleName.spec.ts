import { expect } from "chai";
import { RoleName } from "./RoleName";

let roleName: RoleName;

describe("Unit Test: RoleName", () => {
  // before(async function () {});
  it("RoleName can be created.", () => {
    roleName = RoleName.create({ value: "supervisor" }).getData();
    expect(roleName.value).to.equal("supervisor");
  });

  it("Can't create too short RoleName length", () => {
    roleName = RoleName.create({
      value: "a",
    }).errorValue();
    expect(roleName).to.contain("Text is not at least");
  });

  it("Can't create too long RoleName length", () => {
    roleName = RoleName.create({
      value: "superv12312323232323232323isor",
    }).errorValue();
    expect(roleName).to.contain("Text is greater than");
  });
});
