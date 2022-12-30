var moment = require('moment');

var Sequelize = require("sequelize");
var sequelize = new Sequelize("saloonpos_local", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("../../models/employeeattendancedetail")(sequelize, Sequelize);
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
const Tutorial = db.tutorials;

const { Op } = require('sequelize')

var Sequelize = require("sequelize");
var sequelize = new Sequelize("saloonpos_local", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db2 = {};
db2.Sequelize = Sequelize;
db2.sequelize = sequelize;
db2.tutorials = require("../../models/employeeattendanceclockdetail.js")(sequelize, Sequelize);
db2.sequelize.sync()
const Tutorial2 = db2.tutorials;

exports.create = async (req, res, next) => {
  
    try{
      
        if (req.body.clockAction == "clockin") {

            var startdate = moment().get('year') + "-" + (moment().get('month') + 1) + "-" + moment().get('date');
            var workinghours = moment().set('hour', 1) + "-" + moment().set('minute', 0);
            var clockin = moment().hours() + ":" + moment().minute();
      
            async function first() {
      
              // Tutorial.findAndCountAll({ where: { userId: req.body.userId, attedanceDate: startdate } })
            await Tutorial.findAndCountAll({ where: { userId: req.body.userId
              , attedanceDate: {
                [Op.gte]: moment().subtract(7, 'days').toDate()
              }  // we are find database data using where condition into date and define above op
            } }) 
              .then(async data => {
      
                if (data.rows.length == 0) {
      
                  const tutorial = {
                    userId: req.body.userId,
                    attedanceDate: startdate,
                    clockTime: workinghours,
                    clockAction: "in"
                  };
      
                  await Tutorial.create(tutorial)
      
                }else{
      
                  var data199 = {
                    clockAction  : "in"
                  }
            
                  Tutorial.update(
                    data199
                    , {
                    where: { id  : data.rows[0].id }
                  })
      
                }
      
              })
      
            }
      
            async function second(){
              
              await Tutorial.findAndCountAll({ where: { userId: req.body.userId
                , attedanceDate: {
                  [Op.gte]: moment().subtract(7, 'days').toDate()
                }  // we are find database data using where condition into date and define above op
              } }) 
                .then(data2 => {
            
                  const tutorial2 = {
                employeeAttendanceDetailsId: data2.rows[0].id,
                clockIn: clockin,
                clockOut: clockin,
                duration: workinghours
              };
        
              Tutorial2.create(tutorial2)
        
              res.json({ "message": ` All is well ` });
        
                })
      
            }
      
            async function callback() { 
                await first() ;
                await second() ;
              }
          
            callback();
      
          }
      
          if(req.body.clockAction == "clockout"){
      
            var clockout = moment().hours() + ":" + moment().minute() ;
            var date = moment().get('year') + "-" + (moment().get('month') + 1) + "-" + moment().get('date') ;
      
            await Tutorial.findAndCountAll({ where: { userId: req.body.userId
              , attedanceDate: {
                [Op.gte]: moment().subtract(7, 'days').toDate()
              }  // we are find database data using where condition into date and define above op
            } }).then(async data4 => {
      
              async function Firatfunction(){
                
                var data3 = {
                  clockOut  : clockout
                }
          
                await Tutorial2.update(
                  data3
                  , {
                  where: { employeeAttendanceDetailsId : data4.rows[0].id , duration : "00:00:00" }
                })
      
                Secondfunction();
      
              }
      
              async function Secondfunction(){
      
                var data5 = {
                  clockAction  : "out"
                }
          
                await Tutorial.update(
                  data5
                  , {
                  where: { userId : req.body.userId 
                    , attedanceDate : {
                      [Op.gte]: moment().subtract(7, 'days').toDate()
                    } 
                  }
                })
      
                Thirdfunction();
      
              }
      
              async function Thirdfunction(){
      
                await Tutorial2.findAndCountAll({ where: { employeeAttendanceDetailsId : data4.rows[0].id} 
                }).then(async data20 => {
                  
                  var a = moment(`1999-10-13T${data20.rows[0].clockOut}`);
                  var b = moment(`1999-10-13T${data20.rows[0].clockIn}`);
            
                 var duration1 = a.diff(b, 'hours') ;
                 var duration2 = ( a.diff(b, 'minutes') - a.diff(b, 'hours')*60 );
      
                 var data11 = {
                  duration  : `${duration1}:${duration2}:00`
                }
            
                  await Tutorial2.update(
                    data11
                    , {
                    where: { employeeAttendanceDetailsId : data4.rows[0].id , duration : "00:00:00" }
                  })
                    
                  Forthfunction();
            
                })
      
              }
      
              async function Forthfunction(){
      
                await Tutorial2.findAndCountAll({ where: { employeeAttendanceDetailsId : data4.rows[0].id } 
                }).then(async data16 => {
                  
                  var myArray = []
                  for(var i=0;i<data16.rows.length;i++){
                    myArray.push(data16.rows[i].duration)
                  }
      
                  var hours = 0;
                  var minutes = 0;
                  var seconds = 0;
                  var sum = '';
      
                   var myFunction = function(){
                    for(var i in myArray){
                     hours += parseInt(myArray[i].substring(0, 2))
                     minutes += parseInt(myArray[i].substring(3, 5))
                     seconds += parseInt(myArray[i].substring(6))
                    }
                    if(seconds > 59){
                      minutes += parseInt(seconds / 60);
                      seconds = parseInt(seconds % 60);
                    }
                    
                    if(minutes > 59){
                      hours += parseInt(minutes / 60);
                      minutes = parseInt(minutes % 60);
                    }
                    sum = hours + ":" + minutes + ":" + seconds;
                    
                    var data19 = {
                      clockTime  : sum
                    }
              
                    Tutorial.update(
                      data19
                      , {
                      where: { id  : data4.rows[0].id }
                    })
      
                    // console.log(sum);
                    res.json({ "message": ` All is well ` });
      
                  }
      
                  myFunction();
      
                })
      
              }
      
              Firatfunction();
      
            })
        
          }

    }catch(err){
        console.log(err);
    }

};