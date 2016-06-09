var _ = require('lodash');
var nfaGenerator = function(tuple) {
    var initialState = tuple.startState;
    var finalStates = tuple.finalState;
    var transitionFunction = tuple.transitionFunction;

    return function(inputString) {
        var stringAlpha = inputString.split('');
        var finalStatesForAString = stringProcessor(stringAlpha, initialState, transitionFunction);
        return getFinalStates(finalStatesForAString, finalStates);
    };
};

var isEpsilonPresent = function(transitionFunction, state) {
    return transitionFunction[state]['e'];
}

var getTransitionsAfterEpsilon = function(transitionFunction, state, firstChar) {
    return transitionFunction[state]['e'].map(function(state) {
        return transitionFunction[state][firstChar] || [];
    });
}

var getFinalStates = function(result, finalStates) {
    return result.some(function(state){
        return finalStates.indexOf(state) > -1;
    });
}

var stringProcessor = function(stringAlpha, initialState,transitionFunction) {
    return stringAlpha.reduce(function(initialState, firstChar) {
        var states = initialState.map(function(state){
            if(isEpsilonPresent(transitionFunction,state)){
                return getTransitionsAfterEpsilon(transitionFunction, state, firstChar);
            }
            else
                return transitionFunction[state][firstChar];
        });
        return _.flatten(states);
    }, [initialState]);
}

exports.nfaGenerator = nfaGenerator;