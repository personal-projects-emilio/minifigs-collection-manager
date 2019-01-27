import * as types from '../types';
import * as cases from './cases';
import {updateObject} from '../../shared/utility';

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
    frameSelected: null,
    trunks: null
}

const reducer = (state = initialState, action) => {
	switch( action.type ) {
        case types.SET_NUMBER_PER_PAGE:
            return cases.setNumberPerPage(state, action);
        case types.SET_POSSESSED:
            return cases.setPossessed(state, action);
        case types.SET_POSSESSION_TO_ALL:
            return cases.setPossessionToAll(state, action);
        case types.DELETE_MINIFIG:
            return cases.deleteMinifig(state, action);
        case types.FETCH_FAILED:
            return updateObject(state, {error: true});
        case types.MINIFIG_FORM_HANDLER:
            return cases.minifigFormHandler(state, action);
        case types.SET_ACTIVE_PAGE:
            return updateObject(state, {activePage: action.activePage});
        case types.SET_CHARACNAME:
            return cases.setCharacName(state, action);
        case types.SET_CHARACNAMES:
            return updateObject(state, {characNames: action.characNames});
        case types.SET_FRAMES:
            return updateObject(state, {frames: action.frames});
        case types.SET_MINIFIGS:
        return updateObject(state, {minifigs: action.minifigs});
        case types.SET_PERCENTAGE_OWNED:
            return updateObject(state, {percentageOwned: action.percentageOwned});
        case types.SET_SHOW:
            return updateObject(state, {show: action.show});
        case types.SET_TAG:
            return cases.setTag(state, action);
        case types.SET_TAGS:
            return updateObject(state, {tags: action.tags});
        case types.SET_TOTAL_NUMBER:
            return updateObject(state, {totalNumber: action.totalNumber});
        case types.SET_TOTAL_OWNED:
            return updateObject(state, {numberOwned: action.numberOwned});
        case types.SET_TRUNKS:
            return updateObject(state, {trunks: action.trunks});
		default: return state;
	}
};

export default reducer;