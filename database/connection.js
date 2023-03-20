var mysql2 = require('mysql2')
var conn = mysql2.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'project'
})

conn.connect((err) => {
    if (err) throw err
    console.log('connected!')
})

