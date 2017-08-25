'use strict';

const test = require('assay');
const data = require('./data.js');
const BaseRepo = require('./BaseRepo.js').factory();
const FrozenRepo = require('./FrozenRepo.js').factory(BaseRepo);
const SealedRepo = require('./SealedRepo.js').factory(BaseRepo);
const PreventExtensionsRepo = require('./PreventExtensionsRepo.js').factory(BaseRepo);

test('freezing-and-sealing', {
    'when I add a new property': {
        when: (resolve, reject) => {
            iEnhance(BaseRepo, resolve, reject);
        },
        'it should add a new property to the object': itShouldAddANewProperty,
        'and that object is frozen': {
            when: (resolve, reject) => {
                iEnhance(FrozenRepo, resolve, reject);
            },
            'it should throw an Error': itShouldThrowObjectIsNotExtensible
        },
        'and that object is sealed': {
            when: (resolve, reject) => {
                iEnhance(SealedRepo, resolve, reject);
            },
            'it should throw an Error': itShouldThrowObjectIsNotExtensible
        },
        'and that object prevents extensions': {
            when: (resolve, reject) => {
                iEnhance(PreventExtensionsRepo, resolve, reject);
            },
            'it should throw an Error': itShouldThrowObjectIsNotExtensible
        }
    },
    'when I modify an existing property': {
        when: (resolve, reject) => {
            iModify(BaseRepo, resolve, reject);
        },
        'it should overwrite the property': itShouldOverwriteTheProperty,
        'and that object is frozen': {
            when: (resolve, reject) => {
                iModify(FrozenRepo, resolve, reject);
            },
            'it should throw an Error': itShouldThrowCannotAssign
        },
        'and that object is sealed': {
            when: (resolve, reject) => {
                iModify(SealedRepo, resolve, reject);
            },
            'it should overwrite the property': itShouldOverwriteTheProperty,
        },
        'and that object prevents extensions': {
            when: (resolve, reject) => {
                iModify(PreventExtensionsRepo, resolve, reject);
            },
            'it should overwrite the property': itShouldOverwriteTheProperty,
        }
    }
});

function iEnhance(Repo, resolve, reject) {
    try {
        var repo = prepRepo(Repo, 'products');
        repo.get = function (id) { return this.data[id]; };
        resolve(repo);
    } catch (e) {
        reject(e);
    }
}

function iModify(Repo, resolve, reject) {
    try {
        var repo = prepRepo(Repo, 'products');
        repo.create = function () { return 'EVIL'; };
        resolve(repo);
    } catch (e) {
        reject(e);
    }
}

function itShouldAddANewProperty (t, err, actual) {
    t.ifError(err);
    t.equal(actual.get(1).id, 1);
}

function itShouldOverwriteTheProperty (t, err, actual) {
    t.ifError(err);
    t.equal(actual.create(), 'EVIL');
}

function itShouldThrowObjectIsNotExtensible (t, err) {
    t.equal(err !== null, true, 'an error should be present');
    t.equal(err.message.indexOf('object is not extensible') > -1, true);
}

function itShouldThrowCannotAssign (t, err) {
    t.equal(err !== null, true, 'an error should be present');
    t.equal(err.message.indexOf('Cannot assign to read only property') > -1, true);
}

function prepRepo (Repo, collection) {
    const repo = new Repo(collection);
    data[collection].forEach(repo.create);

    return repo;
}
