import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {updateObject} from '../../shared/utility';


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
                
                // Set the total number of minifigs
				const totalNumber = Object.keys(response.data).length;
				dispatch(setTotalNumber(totalNumber));

				// Set the number of minifigs, tags and character names
                let numberOwned = 0;
                let tags = []; // {name: string, amount: number}
                let characNames = []; // {name: string, amount: number}
                
                // First we set the number owned
                for (const i in response.data) {
                    const owned = response.data[i].possessed;
                    if(owned){numberOwned++}

                    // Then we check the tags and add them to our array
                    const minifigTags = response.data[i].tags;
                    if (minifigTags) {
                        for(let i in minifigTags){
                            // If the tag is unique we had it to the array
                            if(tags.map(tag => tag.name).indexOf(minifigTags[i]) === -1){
                                tags.push({name: minifigTags[i], amount: 1});
                            } else { // Or else we increment the amount of the existing tag
                                const tagI = tags.map(tag => tag.name).indexOf(minifigTags[i])
                                tags[tagI].amount++;
                            }
                        }
                    }
                    // We sort the tags alphabetically
                    tags.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

                    const characName = response.data[i].characterName;
                    if(characName){
                        let index = characNames.map(charac => charac.name).indexOf(characName);
                        if(index === -1){
                            characNames.push({name: characName, amount: 1});
                        } else {
                            characNames[index].amount++;
                        }
                    }  
                    characNames.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                }
                dispatch(setTotalOwned(numberOwned));
                dispatch(setTags(tags));
                dispatch(setCharacs(characNames));
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

export const setFrame = (frame) => {
    return {
        type: actionTypes.SET_FRAME,
        frame: frame
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