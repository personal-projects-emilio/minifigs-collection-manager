import * as actionTypes from './actionTypes';
import axios from '../../axios';

import {updateObject, updateNumbers, getTagsAndCharacNames} from '../../shared/utility';


export const fetchFailed = () => {
	return {
		type: actionTypes.FETCH_FAILED
	}
}

export const setMinifigs = (minifigs) => {
	return {
		type: actionTypes.SET_MINIFIGS,
		minifigs: minifigs
	}
}

export const initMinifigs = () => {
	return dispatch => {
		axios.get('/minifigs.json')
			.then(response => {
				// Init the minifigs
                dispatch(setMinifigs(response.data));
                
                // Set the total and owned numbers and the percentage
				const numbersData = updateNumbers(response.data); // return {totalNumber: number, numberOwned: number, percentageOwned: number}
				dispatch(setTotalNumber(numbersData.totalNumber));
                dispatch(setTotalOwned(numbersData.numberOwned));
                dispatch(setPercentageOwned(numbersData.percentageOwned));

				// Set the tags and character names
                let data = getTagsAndCharacNames(response.data); // return {tags: [name: string, amount: number], characNames: [name: string, amount: number]}
                dispatch(setTags(data.tags));
                dispatch(setCharacs(data.characNames));
			})
			.catch(error =>{
				dispatch(fetchFailed());
			})
	}
};

export const initFrames = () => {
    return dispatch => {
        axios.get('/frames.json')
            .then(response => {
                dispatch(setFrames(response.data));
            })
            .catch(error =>{
                dispatch(fetchFailed());
            })
    }
}

export const setFrames = (frames) => {
    return {
        type: actionTypes.SET_FRAMES,
        frames: frames
    }
}

export const setTotalNumber = (totalNumber) => {
	return {
		type: actionTypes.SET_TOTAL_NUMBER,
		totalNumber: totalNumber
	}
};

export const setTotalOwned = (numberOwned) => {
	return {
		type: actionTypes.SET_TOTAL_OWNED,
		numberOwned: numberOwned
	}
}

export const setPercentageOwned = (percentageOwned) => {
    return {
        type: actionTypes.SET_PERCENTAGE_OWNED,
        percentageOwned: percentageOwned
    }
}

export const setNumberPerPage = (numberPerPage) => {
	return {
		type: actionTypes.SET_NUMBER_PER_PAGE,
		numberPerPage: numberPerPage
	}
}

export const setActivePage = (activePage) => {
	return {
		type: actionTypes.SET_ACTIVE_PAGE,
		activePage: activePage
	}
}

export const setPossessed = (minifigRef) => {
	return {
		type: actionTypes.SET_POSSESSED,
		minifig: minifigRef
	}
}

export const setPossessionToAll = (possessed) => {
	return {
		type: actionTypes.SET_POSSESSION_TO_ALL,
		possessed: possessed
	}
}

//If we want to update the database we could use something like that, but since I am using my data
//the changes are only made locally for the example
export const setPossessedOnServer = (minifig, minifigRef) => {
	const updatedMinifig = updateObject(minifig, {possessed: !minifig.possessed} )
	return dispatch => {
		axios.patch('/minifigs/'+minifigRef+'.json', updatedMinifig)
			.then(response => {
				setPossessed(minifigRef);
			});
	}
}

export const setPossessionToAllOnServer = (minifigs, possessed) => {
	let updatedMinifigs = {};
	Object.keys(minifigs).forEach(minifig => {
		updatedMinifigs[minifig] = updateObject(minifigs[minifig], {possessed: possessed});
	})
	return dispatch => {
		axios.patch('/minifigs.json', updatedMinifigs)
			.then(response => {
				setPossessionToAll(possessed);
			});
	}
}

export const setShow = (show) => {
	return {
		type: actionTypes.SET_SHOW,
		show: show
	}
}

export const setTag = (tag) => {
    return {
        type: actionTypes.SET_TAG,
        tag: tag
    }
}

export const setTags = (tags) => {
    return {
        type: actionTypes.SET_TAGS,
        tags: tags
    }
}

export const setCharac = (charac) => {
    return {
        type: actionTypes.SET_CHARACNAME,
        characName: charac
    }
}

export const setCharacs = (characs) => {
    return {
        type: actionTypes.SET_CHARACNAMES,
        characNames: characs
    }
}

export const updateCharacNames = (oldName, newName) => {
    return {
        type: actionTypes.UPDATE_CHARACNAMES,
        oldName: oldName,
        newName: newName
    }
}

export const editMinifig = (ref, updatedMinifig) => {
    return {
        type: actionTypes.EDIT_MINIFIG,
        ref: ref,
        updatedMinifig: updatedMinifig
    }
}

export const editMinifigServer = (ref, updatedMinifig) => {
    return dispatch => {
        axios.patch('/minifigs/'+ref+'.json', updatedMinifig)
        .then(response => {
            editMinifig(ref, updatedMinifig);
        });
    }
}