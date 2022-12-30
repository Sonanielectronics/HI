module.exports = (sequelize, Sequelize) => {
  const Tutorial2 = sequelize.define("employeeattendanceclockdetail", {
    employeeAttendanceDetailsId:{
      type: Sequelize.INTEGER
    },
    clockIn:{
      type: Sequelize.TIME
    },
    clockOut:{
      type: Sequelize.TIME
    },
    duration:{
      type: Sequelize.TIME
    }

  });

  return Tutorial2  ;
};