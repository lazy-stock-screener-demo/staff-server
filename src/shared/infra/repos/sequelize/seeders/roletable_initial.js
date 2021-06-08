const { v4: uuid_v4 } = require("uuid");
const slug = require("slug");
const runner = require("../runner");
const TextTools = require("../../../../../shared/application/utils/TextTools");

module.exports = {
  up: async (queryInterface) => {
    const INSERT_ROLE = async () => {
      return await queryInterface.bulkInsert("role", [
        {
          role_id: uuid_v4(),
          role_name: "admin",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "admin"
          )}`,
          is_enable: true,
        },
        {
          role_id: uuid_v4(),
          role_name: "super_staff",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "super_staff"
          )}`,
          is_enable: true,
        },
        {
          role_id: uuid_v4(),
          role_name: "manager_staff",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "manager_staff"
          )}`,
          is_enable: true,
        },
        {
          role_id: uuid_v4(),
          role_name: "financial_staff",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "financial_staff"
          )}`,
          is_enable: false,
        },
        {
          role_id: uuid_v4(),
          role_name: "expense_staff",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "expense_staff"
          )}`,
          is_enable: true,
        },
        {
          role_id: uuid_v4(),
          role_name: "detective_staff",
          role_slug: `${TextTools.createRandomNumericString(7)}-${slug(
            "detective_staff"
          )}`,
          is_enable: true,
        },
      ]);
    };
    await runner.run([() => INSERT_ROLE()]);
  },
  down: (queryInterface, Sequelize) => {
    return runner.run([() => queryInterface.bulkDelete("role", null, {})]);
  },
};
