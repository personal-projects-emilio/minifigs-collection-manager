import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {updateObject} from '../../shared/utility';


export const setMinifigsFailed = () => {
	return {
		type: actionTypes.SET_MINIFIGS_FAILED
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
				const totalNumber =Object.keys(response.data).length;
				dispatch(setTotalNumber(totalNumber));

				// Set the number of minifigs owned
				let numberOwned = 0;
				const minifigsArray = Object.keys(response.data);
				minifigsArray.forEach((val) => {
					const owned = response.data[val].possessed;
					if(owned){numberOwned++}
				});
				dispatch(setTotalOwned(numberOwned));
			})
			.catch(error =>{
				dispatch(setMinifigsFailed());
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

//If we want to update the database we could use something like that, but since i'm using my data
//the changes are only made to the redux state to show it works without changing my data
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
