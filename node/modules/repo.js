var MySqlClient = require('mysql');


var globalDb = null;

exports.initConnection = function (dbName, callback) {
    var connectionData = {
        ip: 'localhost',
        user: 'root',
        pass: ''
    };

    globalDb = MySqlClient.createConnection({
        host: connectionData.ip,
        user: connectionData.user,
        password: connectionData.pass,
        database: dbName
    });
    globalDb.connect(function (err) {
        if(err){
            console.log('No database found or different error. Trying to create new db');
            globalDb = MySqlClient.createConnection({
                host: connectionData.ip,
                user: connectionData.user,
                password: connectionData.pass
            });
            globalDb.connect(function (err) {
                if(err){
                    console.log('Error - check host/user/password');
                }
            });
        } else {
            console.log('Database mysql connected successfully!');
            callback();
        }
    });
};

exports.closeConnectionToDb = function () {
    if (globalDb === null) console.log("You are not connected to any database!");

};

exports.CRUD = {
    create: function(table, data, callback){
        if (globalDb === null) console.log("You are not connected to any database!");
        //console.log(data, table);
        var keys = Object.keys(data);
        var firstStr = '(';
        var secondStr = '(';
        for(var i = 0;i<keys.length;i++){
            firstStr += (keys[i] + ', ');
            secondStr += ( '\'' + data[keys[i]] + '\', ' );
        }
        firstStr = firstStr.slice(0, -2);
        firstStr += ')';
        secondStr = secondStr.slice(0, -2);
        secondStr += ')';

        var sql = 'INSERT INTO' + ' ' + table + ' ' + firstStr + ' VALUES ' + secondStr;
        globalDb.query(sql, function (err, result) {
            if(err){
                console.log('error while creating data');
                if(callback) callback('Error');
            } else {
                if(callback) callback('OK');
                console.log("Data inserted to DB");
            }
        });
    },
    read: function (table, callback) {
        if (globalDb === null) console.log("You are not connected to any database!");

        var sql = 'SELECT * FROM ' + table;
        globalDb.query(sql, function (err, result, fields) {
            if(err){
                console.log('error while reading data');
                if(callback) callback(err);
            } else {
                callback(result);
            }
        });
    },
    readWhere: function (table, where, callback) {
        if (globalDb === null) console.log("You are not connected to any database!");

        var sql = 'SELECT * FROM ' + table + ' WHERE ' + where;
        globalDb.query(sql, function (err, result, fields) {
            if(err){
                console.log('error while reading data');
                if(callback) callback(err);
            } else {
                callback(result);
            }
        });
    },
    updateWhere: function (table, set, where, callback) {
        if (globalDb === null) console.log("You are not connected to any database!");
        var sql = 'UPDATE ' + table + ' SET ' + set + ' WHERE ' + where;
        globalDb.query(sql, function (err, result, fields) {
            if(err){
                console.log('error while reading data');
                if(callback) callback(err);
            } else {
                callback(result);
            }
        });
    },
    deleteWhere: function (table, where, callback) {
        if (globalDb === null) console.log("You are not connected to any database!");
        var sql = 'DELETE FROM ' + table + ' WHERE ' + where;
        globalDb.query(sql, function (err, result, fields) {
            if(err){
                console.log('error while reading data');
                if(callback) callback(err);
            } else {
                callback(result);
            }
        });
    }
};