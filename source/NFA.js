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
    return (!_.isEmpty(Object.keys(transitionFunction[state])) && _.includes(Object.keys(transitionFunction[state]),'e'));
}

var getFinalStates = function(finalStatesForAString, finalStates) {
    return finalStatesForAString.some(function(state){
        return finalStates.indexOf(state) > -1;
    });
}

var stateReducer = function(inputString, initialState, transitionFunction) {
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
exports.nfaGenerator = nfaGenerator;


