var path = require('path');
var express = require('express');
var app = express();
var apiRouter = require('express-promise-router')();
const { getAllSongs } = require('./controllers/song-library');

let wrap = fn => (...args) => fn(...args).catch(args[2]);

apiRouter.get('/', function(req, res) {
    res.send(200);
});

apiRouter.get(
    '/songs',
    wrap(async (req, res) => {
        const songs = await getAllSongs();
        res.json(songs);
    })
);

app
    .use('/api', apiRouter)
    .use('/', express.static(path.join(__dirname, 'static')))
    .catch((req, res, err) => {
        console.error(err);
        res.responseText = err.message;
        res.send(500);
    });

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
