module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  });

  return Task;
};