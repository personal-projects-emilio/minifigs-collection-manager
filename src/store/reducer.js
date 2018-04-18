import * as actionTypes from './actions';

const initialState = {
	minifigs: [
		{
			ref: 'SW001a',
			name: 'Battle Droid Tan with Back Plate',
			possesed: false
		},
		{
			ref: 'SW001b',
			name: 'Battle Droid Tan without Back Plate',
			possesed: true
		},
		{
			ref: 'SW001c',
			name: 'Battle Droid Tan with 1 straight Arm',
			possesed: true
		},
		{
			ref: 'SW001d',
			name: 'Battle Droid Tan with 2 straight arms',
			possesed: true
		},
		{
			ref: 'SW002',
			name: 'Boba Fett - Classic Grays',
			possesed: true
		},
		{
			ref: 'SW002a',
			name: 'Boba Fett - Bluish Grays',
			possesed: true
		}
	]
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.CHANGE_POSSESSED:
		return {
			...state,
			minifigs: {
				...state.minifigs
			}
		}
		default: return state;
	}
};

export default reducer;