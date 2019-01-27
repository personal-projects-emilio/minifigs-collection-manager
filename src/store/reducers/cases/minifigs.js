import {updateObject, updateNumbers, getTagsAndCharacNames} from '../../../shared/utility';

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

export const minifigFormHandler = (state, action) => {
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

export const setCharacName = (state, action) => {
    const tagSelected = action.characName ? null : state.tagSelected;
    return updateObject(state, {characSelected: action.characName, tagSelected: tagSelected});
}

export const setNumberPerPage = (state, action) => {
	// If the active page is greater than the new number of page we set the activePage to the last page.
    const numberOfPage = Math.ceil(state.totalNumber/action.numberPerPage);
    const activePage = numberOfPage < state.activePage ? numberOfPage : state.activePage;
	return updateObject( state, {numberPerPage: action.numberPerPage, activePage: activePage} );
}

export const setPossessed = (state, action) => {
    const minifigs = state.minifigs, updatedMinifig = action.updatedMinifig, minifigRef = action.minifigRef;
    // We update the minifigs with our updatedMinifig
    const updatedMinifigs = updateObject(minifigs, {[minifigRef]: updatedMinifig});
    // Then we update the total owned and percentage owned
    const updatedTotalOwned = updatedMinifig.possessed ? state.numberOwned+1 : state.numberOwned-1;
    const percentageOwned = Math.round(updatedTotalOwned/state.totalNumber*10000)/100;
	return updateObject( state, {minifigs: updatedMinifigs, numberOwned: updatedTotalOwned, percentageOwned: percentageOwned} );
}

export const setPossessionToAll = (state, action) => {
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

export const setTag = (state, action) => {
    const characSelected = action.tag ? null : state.characSelected;
    return updateObject(state, {tagSelected: action.tag, characSelected: characSelected} );
}