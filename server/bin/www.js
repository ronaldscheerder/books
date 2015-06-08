/*jslint node: true, devel:true*/
(function () {

    'use strict';

    var app = require('../server.js'), // Require our app
        server = app.listen(app.get('port'), function () {
            console.log('Express server listening on port ' + server.address().port);
        });
}());
