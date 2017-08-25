'use strict';

const test = require('assay');
const Rectangle = require('./Rectangle');
const Square = require('./Square');

test('LSP-with-objects', {
    'when I get the area for a rectangle': {
        when: (resolve) => {
            var height = 5, width = 6, rectangle = new Rectangle();

            rectangle.height = height;
            rectangle.width = width;

            return resolve({
                expected: height * width,
                actual: rectangle.area()
            });
        },
        'it should return the expected area': (t, err, result) => {
            t.ifError(err);
            t.equal(result.actual, result.expected);
        }
    },
    'when I get the area for a square': {
        when: (resolve) => {
            var height = 5, width = 6, square = new Square();

            square.height = height;
            square.width = width;

            return resolve({
                expected: height * width,
                actual: square.area()
            });
        },
        'it should return the expected area': (t, err, result) => {
            t.ifError(err);
            t.equal(result.actual, result.expected);
        }
    }
});
