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
				dispatch(setMinifigs(response.data));
			})
			.catch(error =>{
				dispatch(setMinifigsFailed());
			})
	}
};