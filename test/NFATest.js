var assert = require('chai').assert;
var nfaGenerator = require('../source/NFA.js').nfaGenerator;

describe('NFAGenerator',function() {
    describe(' Language w | w is string with length divisible by 2', function () {
        var tuple = {
            "totalStates": ["q1","q2","q3"],
            "inputSymbols": ['0','1'],
            "transitionFunction":{
              'q1': {0:['q2'], 1:['q2']},
              'q2': {0:['q3'], 1:['q3']},
              'q3': {0:['q2'], 1:['q2']}
            },
            "startState":"q1" ,
            "finalState":['q1','q3']
        };

        it('should accept string 00', function () {
            assert.equal(nfaGenerator(tuple)('00'), true);
        });
        it('should accept empty string', function () {
            assert.ok(nfaGenerator(tuple)(''));
        });
        it('should accept even length of string', function () {
            assert.ok(nfaGenerator(tuple)('010110'));
        });
        it('should not accept single character', function () {
            assert.notOk(nfaGenerator(tuple)('0'));
        });
        it('should not accept odd length of character', function () {
            assert.notOk(nfaGenerator(tuple)('10101'));
        });
    });


    describe('Language w | w is string with length divisible by 2 or 3', function () {
        var tuple = {
            "totalStates": ["q1","q2","q3","q4","q5","q6"],
            "inputSymbols" : ['0','1'],
            "transitionFunction":{
              'q1': {0:['q2','q3'], 1:['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2'], 1:['q2']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3']}
            },
            "startState":"q1" ,
            "finalState":['q1','q4','q6']
        };

        it('should accept string with length 2', function () {
            assert.ok(nfaGenerator(tuple)('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(nfaGenerator(tuple)('010'));
        });
        it('should accept empty string', function () {
            assert.ok(nfaGenerator(tuple)(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(nfaGenerator(tuple)('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(nfaGenerator(tuple)('1'))
            assert.notOk(nfaGenerator(tuple)('10101'));
        });
    });

    describe('Language w | w is a string with even numbers of 0 and 1',function() {
        var tuple = {
            "totalStates": ["q1","q2","q3","q4","q5"],
            "inputSymbols" : ['0','1','e'],
            "transitionFunction":{
              'q1': {'e':['q2','q3']},
              'q2': {0:['q4'], 1:['q2']},
              'q3': {0:['q3'], 1:['q5']},
              'q4': {0:['q2'], 1:['q4']},
              'q5': {0:['q5'], 1:['q3']},
            },
            "startState":"q1" ,
            "finalState":['q2','q3']
        };

        it('should not accept a string with odd number of 0 and 1',function(){
            assert.isFalse(nfaGenerator(tuple)('0111'));
        });

        it('should not accept a string with even number of 0 odd number of 1',function(){
            assert.isFalse(nfaGenerator(tuple)('11001'));
        });

        it('should not accept a string with length 1',function(){
            assert.isFalse(nfaGenerator(tuple)('1'));
            assert.isFalse(nfaGenerator(tuple)('0'));
        });

        it('should accept a string with even number of 1 and 0',function(){
            assert.isTrue(nfaGenerator(tuple)('1001'));
        });
    });

});

