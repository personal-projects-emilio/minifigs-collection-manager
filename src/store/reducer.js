import * as actionTypes from './actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
	minifigs: null,
	error: false,
	totalNumber: null,
	numberOwned: null,
	numberPerPage: 100,
	activePage: 1
}

const setMinifigs = (state, action) => {
	return updateObject(state, {
		minifigs: action.minifigs,
		error: false
	});
}

const setMinifigsFailed = (state, action) => {
	return updateObject( state, {error: true} );
}

const setTotalOwned = (state, action) => {
	return updateObject( state, {numberOwned: action.numberOwned} );
}

const setTotalNumber = (state, action) => {
	return updateObject( state, {totalNumber: action.totalNumber} );
}

const setNumberPerPage = (state, action) => {
	// If the active page is greater than the new number of page we set the activePage to the last page.
	let activePage = state.activePage;
	const numberOfPage =Math.ceil(state.totalNumber/action.numberPerPage);
	if ( numberOfPage < state.activePage) {
		activePage = numberOfPage;
	}
	return updateObject( state, {numberPerPage: action.numberPerPage, activePage: activePage} );
}

const setActivePage = (state, action) => {
	return updateObject( state, {activePage: action.activePage} );
}

const setPossessed = (state, action) => {
	const updatedMinifig = updateObject(state.minifigs[action.minifig], {possesed: !state.minifigs[action.minifig].possesed});
	const updatedMinifigs = updateObject(state.minifigs, {[action.minifig]: updatedMinifig});
	return updateObject( state, {minifigs: updatedMinifigs});
}

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case actionTypes.SET_MINIFIGS: return setMinifigs(state, action);
		case actionTypes.SET_MINIFIGS_FAILED: return setMinifigsFailed(state, action);
		case actionTypes.SET_TOTAL_OWNED: return setTotalOwned(state, action);
		case actionTypes.SET_TOTAL_NUMBER: return setTotalNumber(state, action);
		case actionTypes.SET_NUMBER_PER_PAGE: return setNumberPerPage(state, action);
		case actionTypes.SET_ACTIVE_PAGE: return setActivePage(state, action);
		case actionTypes.SET_POSSESSED: return setPossessed(state, action);
		default: return state;
	}
};

export default reducer;