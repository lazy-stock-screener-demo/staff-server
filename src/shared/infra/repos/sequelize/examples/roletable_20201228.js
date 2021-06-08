const runner = require("../runner");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ADD_ROLE_SLUG = async () => {
      return await queryInterface.addColumn("role", "role_slug", {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: "slug_placement",
      });
    };
    await runner.run([() => ADD_ROLE_SLUG()]);
  },
  down: (queryInterface) => {
    return runner.run([() => queryInterface.removeColumn("role", "role_slug")]);
  },
  // https://github.com/sequelize/sequelize/issues/2263
  // Example with promise based, Oh poor doc......
  // up: function (queryInterface, Sequelize) {
  // 	return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function() {
  // 		return queryInterface.addColumn(
  // 			'TableName',
  // 			'uuidColumnName',
  // 			{
  // 				type: Sequelize.UUID,
  // 				defaultValue: Sequelize.literal('uuid_generate_v4()'),
  // 				allowNull: false
  // 			}
  // 		);
  // 	});
  // },
};
