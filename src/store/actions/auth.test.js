import * as actions from './auth';
import * as types from '../types';

describe('actions/auth', () => {
    it('should create an authFail action', () => {
        expect(actions.authFail('error message')).toEqual({
            type: types.AUTH_FAIL,
            error: 'error message'
        });
    });

    it('should logout', () => {
        expect(actions.logout()).toEqual({
            type: types.AUTH_LOGOUT
        })
    });

    it('should crate an authStart action', () => {
        expect(actions.authStart()).toEqual({
            type: types.AUTH_START
        });
    });

    it('should create a authSuccess ation',() => {
        expect(actions.authSuccess('token', 'user')).toEqual({
            type: types.AUTH_SUCCESS,
            idToken: 'token',
            userId: 'user'
        });
    });

    it('should checkAuthTimeout', () => {
    });

    it('should auth', () => {
    });

    it('should set auth redirect path', () => {
        expect(actions.setAuthRedirectPath('/somewhere')).toEqual({
            type: types.SET_AUTH_REDIRECT_PATH,
            path: '/somewhere'
        })
    });

    it('should check auth state', () => {

    });
});