const runner = require("../runner");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CREATE_ROLE = async () => {
      return await queryInterface.createTable("role", {
        sequence: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        role_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
          field: "id",
        },
        role_slug: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: "slug_placement",
        },
        role_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        is_enable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      });
    };
    // const CREATE_MEMBER = () => {};
    // await runner.run([() => CREATE_STAFF(), () => CREATE_MEMBER()]);
    await runner.run([() => CREATE_ROLE()]);
  },
  down: (queryInterface, Sequelize) => {
    return runner.run([() => queryInterface.dropTable("role")]);
  },
};
