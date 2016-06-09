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

    describe('Language w | w is the string ending with 0', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4"],
                "inputSymbols": ["0", "1", "e"],
                "transitionFunction": {
                    "q1": {"e": ["q2"]},
                    "q2": {"e": ["q3"]},
                    "q3": {"0": ["q3", "q4"], "1": ["q3"]},
                    "q4": {}
                },
                "startState": "q1",
                "finalState": ["q4"]

            };
            var nfa = nfaGenerator(language);
            it("should pass for 00", function () {
                assert.ok(nfa("00"));
            });
            it("should pass for 01110", function () {
                assert.ok(nfa("01110"));
            });
            it("should fail for 11", function () {
                assert.notOk(nfa("11"));
            });
        });

    describe('Language w | w is the string that ends with 101', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4"],
                "inputSymbols": ["1", "0"],
                "transitionFunction": {
                    "q1": {"0": ["q1"], "1": ["q1", "q2"]},
                    "q2": {"0": ["q3"]},
                    "q3": {"1": ["q4"]},
                    "q4": {}
                },
                "startState": "q1",
                "finalState": ["q4"]
            };
            var nfa = nfaGenerator(language);
            it("should fail for empty string", function () {
                assert.notOk(nfa(""));
            });
            it("should fail for 01", function () {
                assert.notOk(nfa("01"));
            });
            it("should pass for 101", function () {
                assert.ok(nfa("101"));
            });
            it("should pass for 0101", function () {
                assert.ok(nfa("0101"));
            });
            it("should pass for 1101", function () {
                assert.ok(nfa("1101"));
            });
        });

        describe('Language w | w is the string containing with an even number of 1s or even number of 0s', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4", "q5"],
                "inputSymbols": ["1", "0", "e"],
                "transitionFunction": {
                    "q1": {"e": ["q2", "q4"]},
                    "q2": {"0": ["q3"], "1": ["q2"]},
                    "q3": {"0": ["q2"], "1": ["q3"]},
                    "q4": {"0": ["q4"], "1": ["q5"]},
                    "q5": {"0": ["q5"], "1": ["q4"]}
                },
                "startState": "q1",
                "finalState": ["q2", "q4"]
            };
            var nfa = nfaGenerator(language);

            it("should pass for 11", function () {
                assert.ok(nfa("11"))
            });
            it("should pass for 00", function () {
                assert.ok(nfa("00"))
            });
            it("should fail for 01", function () {
                assert.notOk(nfa("01"))
            });
        });



        describe('Language a^n | n is even or divisible by 3', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4", "q5", "q6"],
                "inputSymbols": ["a", "e"],
                "transitionFunction": {
                    "q1": {"e": ["q2", "q3"]},
                    "q2": {"a": ["q4"]},
                    "q3": {"a": ["q5"]},
                    "q4": {"a": ["q2"]},
                    "q5": {"a": ["q6"]},
                    "q6": {"a": ["q3"]},
                },
                "startState": "q1",
                "finalState": ["q2", "q3"]

            };
            var nfa = nfaGenerator(language);
            it("should accept string aa", function () {
                assert.ok(nfa("aa"));
            });
            it("should accept string aaaa", function () {
                assert.ok(nfa("aaaa"));
            });
            it("should not accept string aaaaa", function () {
                assert.notOk(nfa("aaaaa"));
            });
        });

        describe('Language w | w is string with length divisible by 2', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3"],
                "inputSymbols": ['0', '1'],
                "transitionFunction": {
                    'q1': {0: ['q2'], 1: ['q2']},
                    'q2': {0: ['q3'], 1: ['q3']},
                    'q3': {0: ['q2'], 1: ['q2']}
                },
                "startState": "q1",
                "finalState": ['q1', 'q3']
            };
            var nfa = nfaGenerator(language);

            it('should accept string 00', function () {
                assert.ok(nfa('00'));
            });
            it('should accept empty string', function () {
                assert.ok(nfa(''));
            });
            it('should accept even length of string', function () {
                assert.ok(nfa('010110'));
            });
            it('should not accept single character', function () {
                assert.notOk(nfa('0'));
            });
            it('should not accept odd length of character', function () {
                assert.notOk(nfa('10101'));
            });
        });

        describe('Language w | w is string with length divisible by 2 or 3', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4", "q5", "q6"],
                "inputSymbols": ['0', '1'],
                "transitionFunction": {
                    'q1': {0: ['q2', 'q3'], 1: ['q2', 'q3']},
                    'q2': {0: ['q4'], 1: ['q4']},
                    'q3': {0: ['q5'], 1: ['q5']},
                    'q4': {0: ['q2'], 1: ['q2']},
                    'q5': {0: ['q6'], 1: ['q6']},
                    'q6': {0: ['q3'], 1: ['q3']}
                },
                "startState": "q1",
                "finalState": ['q1', 'q4', 'q6']
            };
            var nfa = nfaGenerator(language);

            it('should accept string with length 2', function () {
                assert.ok(nfa('00'));
            });
            it('should accept string with length 3', function () {
                assert.ok(nfa('010'));
            });
            it('should accept empty string', function () {
                assert.ok(nfa(''));
            });
            it('should accept string with length divisible by both 2 & 3', function () {
                assert.ok(nfa('101010'));
            });
            it('should not accept string with length neither divisible by 2 nor 3', function () {
                assert.notOk(nfa('1'));
                assert.notOk(nfa('10101'));
            });
        });

        describe('Language w | w is string with length divisible by 2 or 3 with epsilon in middle', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4", "q5", "q6"],
                "inputSymbols": ['0', '1'],
                "transitionFunction": {
                    'q1': {'e': ['q2', 'q3']},
                    'q2': {0: ['q4'], 1: ['q4']},
                    'q3': {0: ['q5'], 1: ['q5']},
                    'q4': {0: ['q2'], 1: ['q2']},
                    'q5': {0: ['q6'], 1: ['q6']},
                    'q6': {0: ['q3'], 1: ['q3']}
                },
                "startState": "q1",
                "finalState": ['q2', 'q3']
            };
            var nfa = nfaGenerator(language);

            it('should accept string with length 2', function () {
                assert.ok(nfa('00'));
            });
            it('should accept string with length 3', function () {
                assert.ok(nfa('010'));
            });
            it('should accept empty string', function () {
                assert.ok(nfa(''));
            });
            it('should accept string with length divisible by both 2 & 3', function () {
                assert.ok(nfa('101010'));
            });
            it('should not accept string with length neither divisible by 2 nor 3', function () {
                assert.notOk(nfa('1'));
                assert.notOk(nfa('10101'));
            });
        });

        describe('Language w | w is string with length divisible by 2 or 3 with epsilon at last', function () {
            var language = {
                "totalStates": ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
                "inputSymbols": ['0', '1'],
                "transitionFunction": {
                    'q1': {0: ['q2', 'q3'], 1: ['q2', 'q3']},
                    'q2': {0: ['q4'], 1: ['q4']},
                    'q3': {0: ['q5'], 1: ['q5']},
                    'q4': {0: ['q2', 'q7'], 1: ['q2'], 'e': ['q8']},
                    'q5': {0: ['q6'], 1: ['q6']},
                    'q6': {0: ['q3'], 1: ['q3'], 'e': ['q9', 'q10']},
                    'q7': {}, 'q8': {}, 'q9': {}, 'q10': {}
                },
                "startState": "q1",
                "finalState": ['q1', 'q8', 'q9', 'q10']
            };
            var nfa = nfaGenerator(language);

            it('should accept string with length 2', function () {
                assert.ok(nfa('00'));
            });
            it('should accept string with length 3', function () {
                assert.ok(nfa('010'));
            });
            it('should accept empty string', function () {
                assert.ok(nfa(''));
            });
            it('should accept string with length divisible by both 2 & 3', function () {
                assert.ok(nfa('101010'));
            });
            it('should not accept string with length neither divisible by 2 nor 3', function () {
                assert.notOk(nfa('1'));
                assert.notOk(nfa('10101'));
            });
        });


});

