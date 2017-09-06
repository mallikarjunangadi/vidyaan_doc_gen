var mongoClient = require('mongodb').MongoClient();
var _db;

module.exports = {
    url: 'mongodb://localhost:27017/VidyaanDocDB',
    connect: function(callback) {
        mongoClient.connect(this.url, (err, db) => {
            if(err) {
               return callback(err, null);
            }
            _db = db;
            return; 
        })
    },
    getDb: () => {
        return _db;
    },
    orgCol: 'Organizations',
    userCol: 'Users'
}