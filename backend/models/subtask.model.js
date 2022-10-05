module.exports = (sequelize, DataTypes) => {
  const Subtask = sequelize.define("subtasks", {
    title: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  });

  return Subtask;
};