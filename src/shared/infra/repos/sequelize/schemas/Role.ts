export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        // field: "role_id",
        allowNull: false,
        primaryKey: true,
      },
      role_slug: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      role_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "role",
    }
  );
  Role.associate = (models) => {};
  return Role;
};
