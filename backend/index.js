var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require("underscore");

var data = require('./data') 

app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 
    extended: true
  }));
 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
}); 
app.get("/display/doctors",function(req,res){
    console.log("inside all doctors handler")
    res.send({
        status: 200,
        result:data

    })
})

app.get("/details", function(req,res){ 
    console.log("inside details handler")
    console.log(req.headers.id)
    var users = JSON.stringify(data)
    var filtered = data.filter(function(item){
        return (item.id == req.headers.id);
      });
      
      jsonRows = JSON.stringify(filtered);
      var speciality = filtered[0]['speciality']
      let arr = []
      speciality.forEach(function (arrayItem) {
        var x = arrayItem.name
        arr.push(x);
    });
    console.log(arr)
    // var q = _.filter(data,function(item){
    //     return _.intersection(item.speciality,filtered)
    // })

    const r = data.filter(d => d.speciality.find(c => arr.includes(c.name)));
    const z = _.shuffle(r)
    console.log(JSON.stringify(r))

    //console.log(x)
    var ndata = JSON.stringify(r)
    res.send({
        status: 200,
        result:filtered,
        result_1: speciality,
        result_2: z
    })

})

app.listen(3001);
console.log("Server Listening on port 3001");



