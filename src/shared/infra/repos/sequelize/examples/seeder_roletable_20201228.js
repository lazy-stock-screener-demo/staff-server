const runner = require("../runner");
const { v4: uuid_v4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const UPDATE_ROLE_SLUG = async () => {
      return await queryInterface.sequelize.query(
        'UPDATE "role" SET role_slug = role_name WHERE role_slug = "slug_placement"'
      );
    };
    await runner.run([() => UPDATE_ROLE_SLUG()]);
  },
  down: (queryInterface, Sequelize) => {
    return runner.run([
      () =>
        queryInterface.sequelize.query(
          'UPDATE "role" SET role_slug = "slug_placement" WHERE role_slug IS NULL'
        ),
    ]);
  },
};
