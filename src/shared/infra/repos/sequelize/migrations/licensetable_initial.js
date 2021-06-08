const runner = require("../runner");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CREATE_LICENSE = async () => {
      return await queryInterface.createTable("license", {
        sequence: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        license_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
          field: "id",
        },
        license_name: {
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
          timestamps: true,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: Sequelize.DATE,
          timestamps: true,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      });
    };
    // const CREATE_MEMBER = () => {};
    // await runner.run([() => CREATE_STAFF(), () => CREATE_MEMBER()]);
    await runner.run([() => CREATE_LICENSE()]);
  },
  down: (queryInterface, Sequelize) => {
    return runner.run([() => queryInterface.dropTable("license")]);
  },
};
