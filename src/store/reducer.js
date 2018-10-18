import { LOCATION_CHANGE } from 'react-router-redux';
import * as actionTypes from './actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
    error: false,
	minifigs: null,
	totalNumber: null,
    numberOwned: null,
    percentageOwned: 0,
	numberPerPage: 100,
	activePage: 1,
    show: "all",
    tags: null,
    tagSelected: null,
    characNames: null,
    characSelected: null,
    frames: null,
    frameSelected: null

}

const setMinifigs = (state, action) => {
	return updateObject(state, {
		minifigs: action.minifigs,
		error: false
	});
}

const fetchFailed = (state, action) => {
	return updateObject( state, {error: true} );
}

const setTotalOwned = (state, action) => {
    const percentageOwned = (action.numberOwned && state.totalNumber) ? Math.round((action.numberOwned/state.totalNumber)*10000)/100 : 0;
	return updateObject( state, {numberOwned: action.numberOwned, percentageOwned: percentageOwned} );
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
	return updateObject(state, {show: action.show});
}

const setTag = (state, action) => {
    const characSelected = action.tag ? null : state.characSelected;
    return updateObject(state, {tagSelected: action.tag, characSelected: characSelected} );
}

const setTags = (state, action) => {
    return updateObject(state, {tags: action.tags});
}

const setCharacName = (state, action) => {
    const tagSelected = action.characName ? null : state.tagSelected;
    return updateObject(state, {characSelected: action.characName, tagSelected: tagSelected});
}

const setCharacNames = (state, action) => {
    return updateObject(state, {characNames: action.characNames});
}

const setFrames = (state, action) => {
    return updateObject(state, {frames: action.frames});
}

const setFrame = (state, action) => {
    return updateObject(state, {frameSelected: action.frame});
}

const locationChange = (state, action) => {
    console.log(action);
}

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case actionTypes.SET_MINIFIGS: return setMinifigs(state, action);
		case actionTypes.FETCH_FAILED: return fetchFailed(state, action);
		case actionTypes.SET_TOTAL_OWNED: return setTotalOwned(state, action);
		case actionTypes.SET_TOTAL_NUMBER: return setTotalNumber(state, action);
		case actionTypes.SET_NUMBER_PER_PAGE: return setNumberPerPage(state, action);
		case actionTypes.SET_ACTIVE_PAGE: return setActivePage(state, action);
		case actionTypes.SET_POSSESSED: return setPossessed(state, action);
		case actionTypes.SET_POSSESSION_TO_ALL: return setPossessionToAll(state, action);
        case actionTypes.SET_SHOW: return setShow(state, action);
        case actionTypes.SET_TAG: return setTag(state, action);
        case actionTypes.SET_TAGS: return setTags(state, action);
        case actionTypes.SET_CHARACNAME: return setCharacName(state, action);
        case actionTypes.SET_CHARACNAMES: return setCharacNames(state, action);
        case actionTypes.SET_FRAME: return setFrame(state, action);
        case actionTypes.SET_FRAMES: return setFrames(state, action);
        case LOCATION_CHANGE: return locationChange(state,action);
		default: return state;
	}
};

export default reducer;