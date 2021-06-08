export default (sequelize, DataTypes) => {
  const License = sequelize.define(
    "license",
    {
      license_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: "id",
        allowNull: false,
        primaryKey: true,
      },
      license_name: {
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
      timestamps: true,
      underscored: true,
      tableName: "license",
    }
  );
  License.associate = (models) => {};
  return License;
};
