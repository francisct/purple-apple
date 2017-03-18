var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var facebook = require('./api/facebook');

const app = express();
const index = require('./routes/index');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', index);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});


app.get(['/', '/index.html', '/home', '/index'], function(req,res){
	res.render('index', {});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development')
{
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
}
else{
    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
}



module.exports = app;
