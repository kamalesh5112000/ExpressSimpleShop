const mysql=require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Kamal@2000'
});

module.exports=pool.promise();