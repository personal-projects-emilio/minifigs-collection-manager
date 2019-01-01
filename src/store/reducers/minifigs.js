import * as actionTypes from '../actions/actionTypes';
import {updateObject, updateNumbers, getTagsAndCharacNames} from '../../shared/utility';

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

const setMinifigs = (state, action) => {
	return updateObject(state, {
        minifigs: action.minifigs
	});
}

const fetchFailed = (state, _action) => {
	return updateObject( state, {error: true} );
}

const setTotalNumber = (state, action) => {
	return updateObject( state, {totalNumber: action.totalNumber} );
}

const setTotalOwned = (state, action) => {
	return updateObject( state, {numberOwned: action.numberOwned} );
}

const setPercentageOwned = (state, action) => {
    return updateObject( state, {percentageOwned: action.percentageOwned})
}



const setNumberPerPage = (state, action) => {
	// If the active page is greater than the new number of page we set the activePage to the last page.
    const numberOfPage = Math.ceil(state.totalNumber/action.numberPerPage);
    const activePage = numberOfPage < state.activePage ? numberOfPage : state.activePage;
	return updateObject( state, {numberPerPage: action.numberPerPage, activePage: activePage} );
}

const setActivePage = (state, action) => {
	return updateObject( state, {activePage: action.activePage} );
}

const setPossessed = (state, action) => {
    const minifigs = state.minifigs, updatedMinifig = action.updatedMinifig, minifigReg = action.minifigRef;
    // We update the minifigs with our updatedMinifig
    const updatedMinifigs = updateObject(minifigs, {[minifigReg]: updatedMinifig});
    // Then we update the total owned and percentage owned
    const updatedTotalOwned = updatedMinifig.possessed ? state.numberOwned+1 : state.numberOwned-1;
    const percentageOwned = Math.round(updatedTotalOwned/state.totalNumber*10000)/100;
	return updateObject( state, {minifigs: updatedMinifigs, numberOwned: updatedTotalOwned, percentageOwned: percentageOwned} );
}

const setPossessionToAll = (state, action) => {
	let updatedMinifigs = {};
	Object.keys(state.minifigs).forEach(minifig => {
		updatedMinifigs[minifig] = updateObject(state.minifigs[minifig], {possessed: action.possessed});
	})
    let numberOwned = 0;
    let percentageOwned = 0;
	if (action.possessed === true){
        numberOwned = state.totalNumber;
        percentageOwned = 100;
	}
	return updateObject( state, {minifigs: updatedMinifigs, numberOwned: numberOwned, percentageOwned: percentageOwned} );
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

const updateCharacNames = (state, action) => {
    let updatedCharacNames = [...state.characNames];
    const index = updatedCharacNames.map(characName => characName.name).indexOf(action.newName);
    if (index === -1) {
        updatedCharacNames.push({name: action.newName, amount: 1});  
    } else {
        updatedCharacNames[index].amount++;
    }
    if (action.oldName !== null) {
        const index = updatedCharacNames.map(characName => characName.name).indexOf(action.oldName);
        updatedCharacNames[index].amount--;
    }
    updatedCharacNames.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    return updateObject(state, {characNames: updatedCharacNames});
}

const updateTags = (state, action) => {
    console.log(action);
    const updatedTags = [...state.tags]
    if (action.action === "add") {
        const index = updatedTags.map(tag => tag.name).indexOf(action.tag);
        if (index === -1) {
            updatedTags.push({name: action.tag, amount: 1});  
        } else {
            updatedTags[index].amount++;
        }
    }
    return updateObject(state, {tags: updatedTags});
}

const setFrames = (state, action) => {
    return updateObject(state, {frames: action.frames});
}

const minifigFormHandler = (state, action) => {
    const numbersData = updateNumbers(action.minifigs);
    const data = getTagsAndCharacNames(action.minifigs);
    return updateObject(state, {
        minifigs: action.minifigs, 
        numberOwned: numbersData.numberOwned, 
        percentageOwned: numbersData.percentageOwned, 
        totalNumber: numbersData.totalNumber, 
        tags: data.tags, 
        characNames: data.characNames
    });
}

export const deleteMinifig = (state, action) => {
    const minifigs = {...state.minifigs};
    const totalNumber = state.totalNumber-1;
    const numberOwned = minifigs[action.minifigRef].possessed ? state.numberOwned-1 : state.numberOwned;
    const percentageOwned = Math.round(numberOwned/totalNumber*10000)/100;
    delete minifigs[action.minifigRef];
    // We get the new tags and characNames after the deletion, we check if our 
    // tagSelected and characSelected still exist, if not we set them to null
    const data = getTagsAndCharacNames(minifigs);
    let tagSelected = state.tagSelected;
    let characSelected = state.characSelected;
    if (data.tags.map(tag => tag.name).indexOf(tagSelected) === -1) {
        tagSelected = null;
    }
    if (data.characNames.map(characName => characName.name).indexOf(characSelected) === -1) {
        characSelected = null;
    }
    return updateObject(state, {
        minifigs: minifigs,
        numberOwned: numberOwned,
        percentageOwned: percentageOwned,
        totalNumber: totalNumber,
        tags: data.tags,
        characNames: data.characNames,
        tagSelected: tagSelected,
        characSelected: characSelected
    });
}

export const setTrunks = (state, action) => {
    return updateObject(state, {trunks: action.trunks});
}


const reducer = (state = initialState, action) => {
	switch( action.type ) {
        case actionTypes.SET_MINIFIGS: return setMinifigs(state, action);
        case actionTypes.SET_FRAMES: return setFrames(state, action);
        case actionTypes.FETCH_FAILED: return fetchFailed(state, action);
        case actionTypes.SET_TOTAL_NUMBER: return setTotalNumber(state, action);
        case actionTypes.SET_TOTAL_OWNED: return setTotalOwned(state, action);
        case actionTypes.SET_PERCENTAGE_OWNED: return setPercentageOwned(state, action);
		case actionTypes.SET_NUMBER_PER_PAGE: return setNumberPerPage(state, action);
        case actionTypes.SET_ACTIVE_PAGE: return setActivePage(state, action);
        case actionTypes.SET_SHOW: return setShow(state, action);
		case actionTypes.SET_POSSESSED: return setPossessed(state, action);
		case actionTypes.SET_POSSESSION_TO_ALL: return setPossessionToAll(state, action);
        case actionTypes.SET_TAG: return setTag(state, action);
        case actionTypes.SET_TAGS: return setTags(state, action);
        case actionTypes.SET_CHARACNAME: return setCharacName(state, action);
        case actionTypes.SET_CHARACNAMES: return setCharacNames(state, action);
        case actionTypes.UPDATE_CHARACNAMES: return updateCharacNames(state, action);
        case actionTypes.UPDATE_TAGS: return updateTags(state, action);
        case actionTypes.MINIFIG_FORM_HANDLER: return minifigFormHandler(state, action);
        case actionTypes.DELETE_MINIFIG: return deleteMinifig(state, action);
        case actionTypes.SET_TRUNKS: return setTrunks(state, action);
		default: return state;
	}
};

export default reducer;