module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("employeeattendancedetail", {
    userId: {
      type: Sequelize.INTEGER
    },
    attedanceDate: {
      type: Sequelize.DATE
    },
    clockTime: {
      type: Sequelize.TIME
    },
    clockAction: {
      type: Sequelize.STRING
    }
  });

  return Tutorial  ;
};
