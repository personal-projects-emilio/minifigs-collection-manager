import * as actionTypes from './actionTypes';
import axios from '../../axios';

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
					const owned = response.data[val].possesed;
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