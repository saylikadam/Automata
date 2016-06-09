var assert = require('chai').assert;
var dfaGenerator = require('../source/DFA.js').dfaGenerator;

describe('DFAGenerator', function() {
    describe('Language w | w is string with length divisible by 2', function() {
        var tuple = {
                        "totalStates": ["q1","q2","q3"],
                        "inputSymbols": ["0","1"],
                        "startState": "q1",
                        "finalState": ["q1","q3"],
                        "transitionFunction":{
                            'q1': {0:'q2', 1:'q2'},
                            'q2': {0:'q3', 1:'q3'},
                            'q3': {0:'q2', 1:'q2'}
                        }
                    }
        it('should return true if even zeros are present', function() {
            assert.isTrue(dfaGenerator(tuple)("1100"));
        });

        it('should accept string 00', function () {
            assert.ok(dfaGenerator(tuple)('00'));
        });

        it('should accept empty string', function () {
            assert.ok(dfaGenerator(tuple)(''));
        });

        it('should accept even length of string', function () {
            assert.ok(dfaGenerator(tuple)('010110'));
        });

        it('should not accept single character', function () {
            assert.notOk(dfaGenerator(tuple)('0'));
        });

        it('should not accept odd length of character', function () {
            assert.notOk(dfaGenerator(tuple)('10101'));
        });
    });


    describe('Language W | W is string with length greater than 3 and has 1 as 3rd alphabet', function(){
            var tuple = {
                "totalStates": ["q1","q2","q3","q4","q5","q6"],
                "inputSymbols": ['0','1'],
                "startState":"q1",
                "finalState":['q5'],
                "transitionFunction":{
                  'q1': {0:'q2', 1:'q2'},
                  'q2': {0:'q3', 1:'q3'},
                  'q3': {0:'q6', 1:'q4'},
                  'q4': {0:'q5', 1:'q5'},
                  'q5': {0:'q5', 1:'q5'},
                  'q6': {0:'q6', 1:'q6'}
                }
          };

          it('should accept string with 1 as 3rd alphabet and with length greater than 3', function () {
              assert.ok(dfaGenerator(tuple)("0010"));
              assert.ok(dfaGenerator(tuple)("10100101"));
          });

          it('should not accept empty string', function () {
              assert.notOk(dfaGenerator(tuple)(""));
          });

          it('should not accept string upto length 3', function () {
              assert.notOk(dfaGenerator(tuple)("10"));
          });

          it('should not accept string with 1 as 3rd alphabet', function () {
              assert.notOk(dfaGenerator(tuple)("111"));
          });
        });

});
