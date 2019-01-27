import reducer from './auth';
import * as types from '../types';

describe('reducer/auth', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set loading when starting', () => {
        const action = {
            type: types.AUTH_START,
        };
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('should store the token upon login', () => {
        const action = {
            type: types.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        };
        initialState.loading = true;
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            token: 'some-token',
            userId: 'some-user-id',
            loading: false,
        });
    });

    it('should store the error when failing', () => {
        const action = {
            type: types.AUTH_FAIL,
            error: 'Error message'
        };
        initialState.loading = true;
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            error: 'Error message',
            loading: false,
        });
    });

    it('should delete token when logout', () => {
        const action = {
            type: types.AUTH_LOGOUT,
        };
        initialState = {
            ...initialState,
            token: 'some-token',
            userId: 'some-user-id'
        };
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            token: null,
            userId: null,
        });
    });

    it('should set the redirect path', () => {
        const action = {
            type: types.SET_AUTH_REDIRECT_PATH,
            path: '/somewhereElse'
        }
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            authRedirectPath: '/somewhereElse'
        });
    });
});
