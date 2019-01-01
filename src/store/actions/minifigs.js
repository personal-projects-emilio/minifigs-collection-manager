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

export const setFrames = (frames) => {
    return {
        type: actionTypes.SET_FRAMES,
        frames: frames
    }
}

export const setTrunks = (trunks) => {
    return {
        type: actionTypes.SET_TRUNKS,
        trunks: trunks
    }
}

export const fetchData = () => {
	return dispatch => {
        // We fetch the minifigs in our DB
		axios.get('/minifigs.json')
			.then(res => {
                // We sort the minifigs and init them
                let minifigs = {}
                Object.keys(res.data).sort((a,b) => {
                    const A = parseInt(a.replace(/\D/g, ''), 10);
                    const B = parseInt(b.replace(/\D/g, ''), 10);
                    const value = (A > B) ? 1 : ((B > A) ? -1 : 0);
                    return value;
                }).map(minifigRef => minifigs[minifigRef] = res.data[minifigRef] );
                dispatch(setMinifigs(minifigs));
                
                // Set the total and owned numbers and the percentage
                const numbersData = updateNumbers(res.data); 
				dispatch(setTotalNumber(numbersData.totalNumber));
                dispatch(setTotalOwned(numbersData.numberOwned));
                dispatch(setPercentageOwned(numbersData.percentageOwned));

				// Set the tags and character names
                let data = getTagsAndCharacNames(res.data); 
                dispatch(setTags(data.tags));
                dispatch(setCharacs(data.characNames));
			})
			.catch(error =>{
				dispatch(fetchFailed());
            })
        // We fetch the frames in our DB
        axios.get('/frames.json')
            .then(res => {
                dispatch(setFrames(res.data));
            })
            .catch(err =>{
                dispatch(fetchFailed());
            })
        axios.get('/trunks.json')
            .then(res => {
                dispatch(setTrunks(res.data));
            })
            .catch(err => {
                dispatch(fetchFailed());
            })
	}
};


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


export const setPossessionToAll = (possessed) => {
	return {
		type: actionTypes.SET_POSSESSION_TO_ALL,
		possessed: possessed
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

export const updateTags = (tag, action) => {
    return {
        type: actionTypes.UPDATE_TAGS,
        tag: tag,
        action: action
    }
}

export const setPossessed = (minifig, minifigRef) => {
    const updatedMinifig = updateObject(minifig, {possessed: !minifig.possessed} )
    const action = {
        type: actionTypes.SET_POSSESSED,
        minifigRef: minifigRef,
        updatedMinifig: updatedMinifig
    }
    return (dispatch, getState) => {
        // If I am authentificate I edit in the DB, else only in the store
        const isAuth = getState().auth.token !== null;
        if (isAuth) {
            axios.patch('/minifigs/'+minifigRef+'.json', updatedMinifig)
                .then(res => dispatch(action));
        
        } else { dispatch(action) }
    }
}

export const deleteMinifig = (minifigRef) => {
    const action = {
        type: actionTypes.DELETE_MINIFIG,
        minifigRef: minifigRef
    }
    return (dispatch, getState) => {
        const isAuth = getState().auth.token !== null;
        if (isAuth) {
            axios.delete('/minifigs/'+minifigRef+'.json')
                .then(res => dispatch(action))
        } else {dispatch(action)}
    }
}
export const minifigFormHandler = (minifigRef, oldMinifigRef, minifig, edit) => { 
    return (dispatch, getState) => {
        const isAuth = getState().auth.token !== null;
        const minifigs = getState().minifigs.minifigs;
        const updatedMinifig = updateObject(minifigs[minifigRef], minifig );
        const updatedMinifigs = updateObject(minifigs, {[minifigRef] : updatedMinifig});
        
        // If we have change the ref in edit mode we delete the old one
        if (oldMinifigRef){
            delete updatedMinifigs[oldMinifigRef];
        }

        // We sort the minifigs if it's not an edit from the same ref
        let updatedMinifigsSorted = {};
        Object.keys(updatedMinifigs).sort((a,b) => {
                const A = parseInt(a.replace(/\D/g, ''), 10);
                const B = parseInt(b.replace(/\D/g, ''), 10);
                const value = (A > B) ? 1 : ((B > A) ? -1 : 0);
                return value;
            })
            .map(minifigRef => updatedMinifigsSorted[minifigRef] = updatedMinifigs[minifigRef] );
        const action = {
            type: actionTypes.MINIFIG_FORM_HANDLER,
            minifigs: updatedMinifigsSorted
        };
        if (isAuth) {
            if (edit && !oldMinifigRef) {
                axios.patch('/minifigs/' + minifigRef + '.json', minifig)
                    .then(res => dispatch(action))
                    .catch(err => console.log(err))
            } else {
                axios.patch('/minifigs.json', updatedMinifigsSorted)
                    .then(res => dispatch(action))
                    .catch(err => console.log(err))
            }
        } else dispatch(action)
    }
}

export const editMinifigServer = (ref, updatedMinifig) => {
    return dispatch => {
        axios.patch('/minifigs/'+ref+'.json', updatedMinifig)
        .then(res => {
            dispatch(minifigFormHandler(ref, updatedMinifig));
        });
    }
}
