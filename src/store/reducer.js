import * as actionTypes from './actions/actionTypes';
import {updateObject, updateNumbers, getTagsAndCharacNames} from '../shared/utility';

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
    const numberOfPage =Math.ceil(state.totalNumber/action.numberPerPage);
    const activePage = numberOfPage < state.activePage ? numberOfPage : state.activePage;
	return updateObject( state, {numberPerPage: action.numberPerPage, activePage: activePage} );
}

const setActivePage = (state, action) => {
	return updateObject( state, {activePage: action.activePage} );
}

const setPossessed = (state, action) => {
    // First we update the minifig and the minifigs
    const minifigs = state.minifigs, minifig = action.minifig;
	const updatedMinifig = updateObject(minifigs[minifig], {possessed: !minifigs[minifig].possessed});
    const updatedMinifigs = updateObject(minifigs, {[minifig]: updatedMinifig});
    // Then we update the total owned and percentage owned
    const updatedTotalOwned = !minifigs[minifig].possessed ? state.numberOwned+1 : state.numberOwned-1;
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

const editMinifig = (state, action) => {
    // We store the reference and delete it from the object to have one that respect our state model {name:"", characName:"", possessed: boolean, tags: array}
    const newRef = action.updatedMinifig.ref;
    delete action.updatedMinifig.ref;

    // We create our updated Minifigs object
    const updatedMinifig = updateObject(state.minifigs[newRef], {...action.updatedMinifig} );
    let updatedMinifigs = updateObject(state.minifigs, {[newRef] : updatedMinifig});
    
    // If we have change the ref in edit mode we delete the old one
    if (action.ref !== newRef && action.ref !== null){
        delete updatedMinifigs[action.ref];
    }

    // We sort the minifigs if it's not an edit from the same ref, it's a bit too complex because 
    // we have to make sure that 30564 is first, x162 is last and the swXXXX are after the swXXX
    let updatedMinifigsSorted = {};
    if (newRef !== action.ref) {
        Object.keys(updatedMinifigs).sort((a,b) => {
                if (a === "x162" || b === "30564" ) {
                    return 1;
                } else if (a === "30564" || b  === "x162") {
                    return -1;
                } else {
                    const A = parseInt(a.replace(/\D/g, ''), 10);
                    const B = parseInt(b.replace(/\D/g, ''), 10);
                    const value = (A > B) ? 1 : ((B > A) ? -1 : 0);
                    return value;
                }
            })
            .map(ref => updatedMinifigsSorted[ref] = updatedMinifigs[ref] );
    }
    const minifigs = !Object.keys(updatedMinifigsSorted).length ? updatedMinifigs : updatedMinifigsSorted;
    
    // We update the numbers
    const numbersData = updateNumbers(minifigs);
    const data = getTagsAndCharacNames(minifigs);
    return updateObject(state, {
        minifigs: minifigs, 
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
    const numberOwned = minifigs[action.ref].possessed ? state.numberOwned-1 : state.numberOwned;
    const percentageOwned = Math.round(numberOwned/totalNumber*10000)/100;
    delete minifigs[action.ref];
    const data = getTagsAndCharacNames(minifigs);
    let tagSelected = state.tagSelected;
    let characSelected = state.characSelected;
    if (data.tags.map(tag => tag.name).indexOf(tagSelected) === -1) {
        tagSelected= null;
    }
    console.log(tagSelected);
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
        case actionTypes.EDIT_MINIFIG: return editMinifig(state, action);
        case actionTypes.DELETE_MINIFIG: return deleteMinifig(state, action);
		default: return state;
	}
};

export default reducer;