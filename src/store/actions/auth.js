import axios from 'axios';

import * as types from '../types';
import {apiKey} from '../../auth/auth';

export const authFail = error => ({
    type: types.AUTH_FAIL,
    error,
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: types.AUTH_LOGOUT
    };
};


export const authStart = () => ({
    type: types.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
    type: types.AUTH_SUCCESS,
    idToken,
    userId,
});

export const checkAuthTimeout = (expirationTime) => (
dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
})

export const auth = (email, password, isSignup) => (
    dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key='+ apiKey;
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ apiKey;
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
);

export const setAuthRedirectPath = (path) => ({
    type: types.SET_AUTH_REDIRECT_PATH,
    path,
});

export const authCheckState = () => (
    dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
);