var dfaGenerator = function(tuple) {

	var initialState = tuple.startState;
	var transitionFunction = tuple.transitionFunction;
	var finalState = tuple.finalState;

	return function(stringVal){
        var splittedString = stringVal.split('');
        var result = splittedString.reduce(function(initialState,firstChar){
            return transitionFunction[initialState][firstChar];
        },initialState);
        return finalState.indexOf(result) >= 0;
 	};
};

exports.dfaGenerator = dfaGenerator;