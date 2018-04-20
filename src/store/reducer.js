import * as actionTypes from './actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
	minifigs: null,
	error: false,
	totalNumber: null,
	numberOwned: null
}

const setMinifigs = (state, action) => {
	return updateObject(state, {
		minifigs: action.minifigs,
		error: false
	});
}

const setMinifigsFailed = (state, action) => {
	return updateObject(state, {error: true} );
}

const setTotalOwned = (state, action) => {
	console.log(action)
	return updateObject(state, {numberOwned: action.numberOwned} );
}

const setTotalNumber = (state, action) => {
	return updateObject(state, {totalNumber: action.totalNumber} );
}

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case actionTypes.SET_MINIFIGS: return setMinifigs(state, action);
		case actionTypes.SET_MINIFIGS_FAILED: return setMinifigsFailed(state, action);
		case actionTypes.SET_TOTAL_OWNED: return setTotalOwned(state, action);
		case actionTypes.SET_TOTAL_NUMBER: return setTotalNumber(state, action);
		default: return state;
	}
};

export default reducer;