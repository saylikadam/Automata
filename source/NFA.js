var _ = require('lodash');

var nfaGenerator = function(tuple) {
    var initialState = tuple.startState;
    var finalStates = tuple.finalState;
    var transitionFunction = tuple.transitionFunction;

    return function(inputString) {
        var finalStatesForAString = stateReducer(inputString, initialState, transitionFunction);
        return getFinalStates(finalStatesForAString, finalStates);
    };
};

var isEpsilonPresent = function(transitionFunction, state) {
    return (transitionFunction[state] && transitionFunction[state]['e']);
}

var getFinalStates = function(finalStatesForAString, finalStates) {
    return finalStatesForAString.some(function(state){
        return finalStates.indexOf(state) > -1;
    });
}

var stateReducer = function(inputString, initialState, transitionFunction) {
    if(inputString.length == 0) {
        return getAllPresentEpsilon(transitionFunction, initialState).concat(initialState);
    }
    return inputString.split('').reduce(function(initialState, firstChar) {
        return stateMapper(initialState, transitionFunction, firstChar);
    }, [initialState]);
}

var stateMapper = function(initialState, transitionFunction, firstChar) {
    return _.flatten(initialState.map(function(state){
        var recordState = transitionFunction[state][firstChar] || [];
        if(isEpsilonPresent(transitionFunction, state)){
            return recordState.concat(stateMapper(transitionFunction[state]['e'], transitionFunction, firstChar));
        }
        return transitionFunction[state] && recordState || [];
    }));
}

var getAllPresentEpsilon = function(transitionFunction,initialState) {
    var transitOnEpsilon = transitionFunction[initialState]['e'];
    return (isEpsilonPresent(transitionFunction,initialState) && transitOnEpsilon || []);
}
exports.nfaGenerator = nfaGenerator;


