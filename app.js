const express=require('express');
const mysql=require('mysql');
 var http = require('http');
const body_parser=require('body-parser');
const app=express();
app.use(express.static(__dirname))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended:true }));


var con = mysql.createConnection({
   host     : 'www.mysql8.db4free.net',
   port     :  3307,
  user: "good",
  password: "andeladb",
  database: "andela"
});

con.connect(function(err) {
  if (!err){
  console.log("Connected!");
  }else{
	  console.log("Connection to db failed "+err.message)
  }
});
app.listen(process.env.PORT || 5000,()=>{
console.log('Sever started');		
})

app.post('/createRecord',function(req,res){
console.log(req.body);
var fname=req.body.fname,
username=req.body.username,
email=req.body.email,
gender=req.body.gender,
bday=req.body.birthday,
add=req.body.address,
phone=req.body.phone,
stclass=req.body.class;

 var sql = "INSERT INTO `student` set `fname`='"+fname+"',`username`='"+username+"', `email`='"+email+"',`gender`='"+gender+"', `bday`='"+bday+"', `add`='"+add+"', `phone`='"+phone+"', `class`='"+stclass+"'";
  con.query(sql, function (err, result) {
    if (!err){
	res.send({"status":"200","message":"Record inserted successfully"})
	}else{
		res.send({"status":"204","message":"An error occurred while processing request! Make sure all required parameters are set."})
		
	}
  });
})

app.put('/update',function(req,res){
console.log(req.body);
var fname=req.body.fname,
username=req.body.username,
email=req.body.email,
gender=req.body.gender,
bday=req.body.birthday,
add=req.body.address,
phone=req.body.phone,
stclass=req.body.class;
std_id=req.body.std_id;

 var sql = "UPDATE `student` set `fname`='"+fname+"',`username`='"+username+"', `email`='"+email+"',`gender`='"+gender+"', `bday`='"+bday+"', `add`='"+add+"', `phone`='"+phone+"', `class`='"+stclass+"' where std_id="+std_id+"";
  con.query(sql, function (err, result) {
    if (!err){
	res.send({"status":"200","message":"Record Updated Successfully"})
	}else{
		res.send({"status":"204","message":"An error occurred while processing request! Make sure all required parameters are set."})
		
	}
  });
})


app.get('/getrecord',function(req,res){

 con.query("SELECT * FROM student", function (err, result) {
    if (!err){
    console.log({'students':result});
	res.send({"status":"200","message":"Data Fetched Successfully","data":result});
	}else{
	res.send({"status":"202","message":"Could Not Fetched Data"});	
	}
})
})

app.get('/getById',function(req,res){
 con.query("SELECT * FROM student where std_id="+req.query.std_id+"", function (err, result) {
    if (!err){
    console.log({'student':result});
	res.send({"status":"200","message":"Data Fetched Successfully","data":result});
	}else{
		res.send({"status":"202","message":"Could Not Fetched Data"});	
		
	}
})
})

app.delete('/delete',function(req,res){
console.log(req);
 con.query("DELETE  FROM student where std_id="+req.query.std_id+"", function (err, result) {
    if (!err){
	res.send({"status":"200","message":"Record Deleted successfully"});
	}else{
		res.send({"status":"202","message":"Could Not Delete Record"});	
	}
})
})

	
