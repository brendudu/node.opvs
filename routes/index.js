const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const getConn = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'opvs'
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

router.post('/', (req, res, err) => {
    var conn = getConn();
    conn.connect();

    conn.query('SELECT * FROM employee WHERE EmpID = ' + req.body.user, (err, rows, fields) => {
        if (err) {
            res.status(500).json({'status_code': 500, 'status_message': 'Internal Server Error'});
        } else {
            if (rows.length === 1) {
                let employee = {
                    'id': rows[0].EmpID,
                    'name': rows[0].FirstName + ' ' + rows[0].LastName,
                    'dept': rows[0].Department,
                    'notif': {
                        'hehe': 'hehehe',
                        'hehehehe': 'hehehe',
                        'hehehehehehe': 'hehehe'
                    }
                };
                res.render('index', {
                    title: 'Hello!',
                    employee: employee
                });
            } else {
                res.status(404).json({"status_code": 404, "status_message": "Not found"});
            }
        }
    });
    conn.end();
});

module.exports = router;
