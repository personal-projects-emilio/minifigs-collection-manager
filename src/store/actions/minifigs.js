import * as types from '../types';
import axios from '../../axios';

import {updateObject, updateNumbers, getTagsAndCharacNames} from '../../shared/utility';


export const fetchFailed = () => ({
    type: types.FETCH_FAILED
});

export const setMinifigs = minifigs => ({
    type: types.SET_MINIFIGS,
    minifigs,
});

export const setFrames = frames => ({
    type: types.SET_FRAMES,
    frames,
});

export const setTrunks = trunks => ({
    type: types.SET_TRUNKS,
    trunks,
});

export const fetchData = () => (dispatch) => {
    // We fetch the minifigs in our DB
    axios.get('/minifigs.json')
        .then(res => {
            // We init the minifigs in the reducer
            dispatch(setMinifigs(res.data));

            // Set the total and owned numbers and the percentage
            const minifigsStat = updateNumbers(res.data);
            dispatch(setTotalNumber(minifigsStat.totalNumber));
            dispatch(setTotalOwned(minifigsStat.numberOwned));
            dispatch(setPercentageOwned(minifigsStat.percentageOwned));

            // Set the tags and character names
            let minifigsInfo = getTagsAndCharacNames(res.data);
            dispatch(setTags(minifigsInfo.tags));
            dispatch(setCharacs(minifigsInfo.characNames));
        })
        .catch(err =>{
            dispatch(fetchFailed());
            console.log(err);
        });
    // We fetch the frames in our DB
    axios.get('/frames.json')
        .then(res => {
            dispatch(setFrames(res.data));
        })
        .catch(err =>{
            dispatch(fetchFailed());
            console.log(err);
        });
    axios.get('/trunks.json')
        .then(res => {
            dispatch(setTrunks(res.data));
        })
        .catch(err => {
            dispatch(fetchFailed());
            console.log(err);
        });
};


export const setTotalNumber = totalNumber => ({
    type: types.SET_TOTAL_NUMBER,
    totalNumber,
});

export const setTotalOwned = numberOwned => ({
    type: types.SET_TOTAL_OWNED,
    numberOwned,
});

export const setPercentageOwned = percentageOwned => ({
    type: types.SET_PERCENTAGE_OWNED,
    percentageOwned,
});

export const setNumberPerPage = numberPerPage => ({
    type: types.SET_NUMBER_PER_PAGE,
    numberPerPage,
});

export const setActivePage = activePage => ({
    type: types.SET_ACTIVE_PAGE,
    activePage,
});

export const setPossessionToAll = possessed => ({
    type: types.SET_POSSESSION_TO_ALL,
    possessed,
});

export const setShow = show => ({
    type: types.SET_SHOW,
    show,
});

export const setTag = tag =>({
    type: types.SET_TAG,
    tag,
});

export const setTags = (tags) =>({
    type: types.SET_TAGS,
    tags,
});

export const setCharac = characName =>({
    type: types.SET_CHARACNAME,
    characName,
});

export const setCharacs = characNames =>({
    type: types.SET_CHARACNAMES,
    characNames: characNames
});

export const setPossessed = (minifig, minifigRef) => {
    const updatedMinifig = updateObject(minifig, {possessed: !minifig.possessed} )
    const action = {
        type: types.SET_POSSESSED,
        minifigRef,
        updatedMinifig,
    }
    return (dispatch, getState) => {
        // If the user is authentificated we edit the DB, else only the store
        const isAuth = getState().auth.token !== null;
        if (isAuth) {
            axios.patch('/minifigs/'+minifigRef+'.json', updatedMinifig)
                .then(() => dispatch(action));

        } else { dispatch(action) }
    }
}

export const deleteMinifig = (minifigRef) => {
    const action = {
        type: types.DELETE_MINIFIG,
        minifigRef,
    }
    return (dispatch, getState) => {
        const isAuth = getState().auth.token !== null;
        if (isAuth) {
            axios.delete('/minifigs/'+minifigRef+'.json')
                .then(() => dispatch(action))
        } else {dispatch(action)}
    }
}

export const minifigFormHandler = (minifigRef, oldMinifigRef, minifig, edit) => (dispatch, getState) => {
    const isAuth = getState().auth.token !== null;
    const stateMinifigs = getState().minifigs.minifigs;
    const updatedMinifig = updateObject(stateMinifigs[minifigRef], minifig );
    const updatedMinifigs = updateObject(stateMinifigs, {[minifigRef] : updatedMinifig});

    // If we have changed the ref in edit mode we delete the old one
    if (oldMinifigRef){
        delete updatedMinifigs[oldMinifigRef];
    }

    // We sort the minifigs if it's not an edit from the same ref
    let minifigs = {};
    if (edit && oldMinifigRef === null) {
        minifigs = updatedMinifigs;
    }
    else {
        Object.keys(updatedMinifigs).sort()
            .map(minifigRef => minifigs[minifigRef] = updatedMinifigs[minifigRef] );
    }

    const action = {
        type: types.MINIFIG_FORM_HANDLER,
        minifigs,
    };

    if (isAuth) {
        if (edit && !oldMinifigRef) {
            axios.patch('/minifigs/' + minifigRef + '.json', minifig)
                .then(() => dispatch(action))
                .catch(err => console.log(err))
        } else {
            axios.patch('/minifigs.json', minifigs)
                .then(() => dispatch(action))
                .catch(err => console.log(err))
        }
    } else dispatch(action)
};

export const editMinifigServer = (ref, updatedMinifig) => (
    dispatch => {
        axios.patch('/minifigs/'+ref+'.json', updatedMinifig)
        .then(() => {
            dispatch(minifigFormHandler(ref, updatedMinifig));
        })
        .catch(err => console.log(err));
    }
);
