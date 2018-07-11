import * as actionTypes from './actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
	minifigs: null,
	error: false,
	totalNumber: null,
	numberOwned: null,
	numberPerPage: 100,
	activePage: 1,
	show: "all"
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
	const updatedMinifig = updateObject(state.minifigs[action.minifig], {possessed: !state.minifigs[action.minifig].possessed});
	const updatedMinifigs = updateObject(state.minifigs, {[action.minifig]: updatedMinifig});
	const updatedTotalOwned = !state.minifigs[action.minifig].possessed ? state.numberOwned+1 : state.numberOwned-1;
	return updateObject( state, {minifigs: updatedMinifigs, numberOwned: updatedTotalOwned} );
}

const setPossessionToAll = (state, action) => {
	let updatedMinifigs = {};
	Object.keys(state.minifigs).forEach(minifig => {
		updatedMinifigs[minifig] = updateObject(state.minifigs[minifig], {possessed: action.possessed});
	})
	let numberOwned = 0;
	if (action.possessed === true){
		numberOwned = state.totalNumber;
	}
	return updateObject( state, {minifigs: updatedMinifigs, numberOwned: numberOwned} );
}

const setShow = (state, action) => {
	return updateObject(state, {show: action.show})
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
		case actionTypes.SET_POSSESSION_TO_ALL: return setPossessionToAll(state, action);
		case actionTypes.SET_SHOW: return setShow(state, action);
		default: return state;
	}
};

export default reducer;