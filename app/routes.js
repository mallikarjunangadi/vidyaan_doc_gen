var dbConfig = require('./dbConfig/db');
var ObjectId = require('mongodb').ObjectID;

module.exports = (app) => { 
    app.get('/getOrgs', function(req, res) {
       var db = dbConfig.getDb();
       db.collection(dbConfig.orgCol).find().toArray((err, data) => {
           if(err) {
             return console.log(err);
           }  
           return res.send({data:data, message:"org successfully fetched", done: true}); 
       })
    })
    app.get('/getOrgsById', function(req, res) {
       var db = dbConfig.getDb();
       console.log(req.query);
       var id = req.query.id;
       db.collection(dbConfig.orgCol).find({_id:ObjectId(id)}).toArray((err, data) => {
           if(err) {
             return console.log(err);
           }  
           console.log(data);
           return res.send({data:data, message:"org successfully fetched", done: true}); 
       })
    })

    app.get('/getUsers', function(req, res) {
         var db = dbConfig.getDb();
         db.collection(dbConfig.userCol).find({}, (err, data) => {
           if(err) {
             return console.log(err);
           }  
           return res.send({data:data, message:"users successfully fetched", done: true}); 
       })
    })
    
  /*  
    app.get('/addOrgs', function(req, res) {
        var db = dbConfig.getDb();
         db.collection(dbConfig.orgCol).insert(orgArr, (err, data) => {
             if(err) {
                return console.log(err);
             }
             console.log('org data inserted successfully...')
         }) 
    })  
        
    app.get('/addUsers', function(req, res) {
         var db = dbConfig.getDb();
         db.collection(dbConfig.userCol).insert(userArr, (err, data) => {
             if(err) {
                return console.log(err);
             }
             console.log('user data inserted successfully...')
         }) 
    }) 
*/
    
} 