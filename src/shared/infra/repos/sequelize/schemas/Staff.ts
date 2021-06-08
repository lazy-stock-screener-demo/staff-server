export default (sequelize, DataTypes) => {
  const Staff = sequelize.define("staff", {});
  Staff.associate = (models) => {};
  return Staff;
};
