const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 //쿠키 유효시간 1시간
    }
}));

app.use(express.json({
    limit: '50mb'
}));

const server = app.listen(3000, () => {
    console.log('Server started. port 3000.');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
    console.log('sql 변경');
    delete require.cache[require.resolve('./sql.js')];
    sql = require('./sql.js');
});

const db = {
    database: 'dev11',
    connectionLimit: 10,
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "8520"
};

const dbPool = require('mysql').createPool(db);

app.post('/api/login', async (request, res) => {
    try{
        await req.db('signUp', request.body.param);
        if(request.body.param.length > 0){
            for(let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
            res.send(request.body.param[0]);
        }else res.send({error: "Please try again or contact system manager."});
    } catch(err){res.send({error: "DB access error"})}
});

app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('ok');
});

app.post('/apirole/:alias', async (request, res) => {
    if(!request.session.email) {
        return res.status(401).send({error: 'You need to login.'});
    }
    try{
        res.send(await req.db(request.params.alias));
    } catch(err){
        res.status(500).send({
            error: err
        });
    }
});

app.post('/api/:alias', async (request, res) => {
    try{
        res.send(await req.db(request.params.alias, request.body.param));
    } catch(err){
        res.status(500).send({error: err});
    }
});

const req = {
    async db(alias, param = [], where = ''){
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if(error){
                if(error.code != 'ER_DUP_ENTRY') console.log(error);
                resolve({error});
            }else resolve(rows);
        }))
    }
};