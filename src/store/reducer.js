import * as actionTypes from './actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
	minifigs: null,
	error: false
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

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case actionTypes.SET_MINIFIGS: return setMinifigs(state, action);
		case actionTypes.SET_MINIFIGS_FAILED: return setMinifigsFailed(state, action);
		default: return state;
	}
};

export default reducer;