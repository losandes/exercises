'use strict';

const test = require('assay');
const scope = require('./app.js');
const http = require('http');

test('ioc-containers', {
    'when the app starts up': {
        when: theServerStarts(),
        'it should return a server, db, logger, and port': appStarts,
        'and I make a GET request for a product': {
            when: iRequestAProduct,
            'it should return a product': returnsAProduct,
            'it should use the mock data connection': usesMockDb,
            'it should use the mock logger': usesMockLogger
        }
    }
});

function theServerStarts () {
    return (resolve, reject) => {
        start(0);

        function start (tries) {
            var server;

            try {
                server = scope.resolve('server');
            } catch (e) { /*ignore*/ }

            if (server.isException) {
                tries += 1;

                if (tries === 100) {
                    return reject(new Error('server never started'));
                }

                return setTimeout(function () {
                    start(tries, resolve);
                }, 10);
            }

            resolve({
                server: server,
                port: scope.resolve('port'),
                db: scope.resolve('db'),
                logger: scope.resolve('logger')
            });
        }
    };
}

function iRequestAProduct (resolve, reject) {
    new Promise(theServerStarts())
        .then(app => {
            http.get({
                host: 'localhost',
                port: 3000,
                path: '/products/42'
            }, function (res) {
                // Continuously update stream with data
                var body = '';

                res.on('data', (d) => {
                    body += d;
                });

                res.on('end', () => {
                    app.product = JSON.parse(body);
                    resolve(app);
                    app.server.close();
                });
            });
        }).catch(reject);
}

function appStarts (t, err, app) {
    t.ifError(err);
    t.equal(typeof app.server, 'object');
    t.equal(3000, 3000);
    t.equal(typeof app.db, 'function');
    t.equal(typeof app.logger, 'object');
}

function returnsAProduct (t, err, actual) {
    t.ifError(err);
    t.equal(actual.product.id, 42);
}

function usesMockDb (t, err, actual) {
    t.ifError(err);
    t.equal(actual.db.getValues().where.id, 42);
}

function usesMockLogger (t, err, actual) {
    t.ifError(err);
    let lastMessage = actual.logger.getMessages().pop();

    t.equal(lastMessage.type, 'info');
    t.equal(lastMessage.message, 'productRepo.get found: 42');
}
