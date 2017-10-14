// @flow

import {
    accountConstants,
    navigatorConstants,
} from '../constants';
import {
    api,
    networkUtils,
} from '../utils';
import * as accountModel from '../models/account';

const {
    ACCOUNT_DEFAULT_SET,
    ACCOUNT_RESET_LOGIN_STATE,
    ACCOUNT_MAKE_SIGN_IN_ACTIVE,
    ACCOUNT_MAKE_SIGN_UP_ACTIVE,
    ACCOUNT_MAKE_FORGOT_PASSWORD_ACTIVE,
    ACCOUNT_SIGN_IN,
    ACCOUNT_SIGN_IN_ERROR,
    ACCOUNT_SIGN_IN_NETWORK_ERROR,
    ACCOUNT_SIGN_IN_SUCCESS,
    ACCOUNT_SIGN_UP,
    ACCOUNT_SIGN_UP_ERROR,
    ACCOUNT_SIGN_UP_NETWORK_ERROR,
    ACCOUNT_SIGN_UP_SUCCESS,
    ACCOUNT_RESTORE_PASSWORD,
    ACCOUNT_RESTORE_PASSWORD_NETWORK_ERROR,
    ACCOUNT_RESTORE_PASSWORD_ERROR,
    ACCOUNT_RESTORE_PASSWORD_SUCCESS,
} = accountConstants;
const { NAVIGATOR_REPLACE } = navigatorConstants;

export const defaultSet = (data) => ({
    type: ACCOUNT_DEFAULT_SET,
    payload: data,
});

export const resetLoginState = () => ({
    type: ACCOUNT_RESET_LOGIN_STATE,
});

export const makeSignInActive = () => ({
    type: ACCOUNT_MAKE_SIGN_IN_ACTIVE,
});

export const makeSignUpActive = () => ({
    type: ACCOUNT_MAKE_SIGN_UP_ACTIVE,
});

export const makeForgotPasswordActive = () => ({
    type: ACCOUNT_MAKE_FORGOT_PASSWORD_ACTIVE,
});

export const signIn = (email: string, password: string) => {
    return async (dispatch) => {
        dispatch({
            type: ACCOUNT_SIGN_IN,
        });

        try {
            await networkUtils.checkConnect();
        } catch (err) {
            return dispatch({
                type: ACCOUNT_SIGN_IN_NETWORK_ERROR,
            });
        }

        return api.postJSON({
            url: '/users/login',
            data: {
                email,
                password,
            },
        }).then(response => {
            accountModel.set({
                profile: response,
                authorisation: {
                    access_token: response.hash,
                },
            });
            dispatch({
                type: ACCOUNT_SIGN_IN_SUCCESS,
                payload: response,
            });
            requestAnimationFrame(() => {
                dispatch({
                    type: NAVIGATOR_REPLACE,
                    payload: {
                        id: 'search',
                    },
                });
            });
        }).catch(error => dispatch({
            type: ACCOUNT_SIGN_IN_ERROR,
            payload: error,
        }));
    };
};

export const signUp = (name: string, email: string, password: string) => {
    return async (dispatch) => {
        dispatch({
            type: ACCOUNT_SIGN_UP,
        });

        try {
            await networkUtils.checkConnect();
        } catch (err) {
            return dispatch({
                type: ACCOUNT_SIGN_UP_NETWORK_ERROR,
            });
        }

        return api.postJSON({
            url: '/users',
            data: {
                email,
                name,
                password,
            },
        }).then(response => {
            accountModel.set({
                profile: response,
                authorisation: {
                    access_token: response.hash,
                },
            });
            dispatch({
                type: ACCOUNT_SIGN_UP_SUCCESS,
                payload: response,
            });
            requestAnimationFrame(() => {
                dispatch({
                    type: NAVIGATOR_REPLACE,
                    payload: {
                        id: 'search',
                    },
                });
            });
        }).catch(error => dispatch({
            type: ACCOUNT_SIGN_UP_ERROR,
            payload: error,
        }));
    };
};

export const restorePassword = (email: string) => {
    return async (dispatch) => {
        dispatch({
            type: ACCOUNT_RESTORE_PASSWORD,
        });

        try {
            await networkUtils.checkConnect();
        } catch (err) {
            return dispatch({
                type: ACCOUNT_RESTORE_PASSWORD_NETWORK_ERROR,
            });
        }

        return api.post({
            url: '/users/password/restore',
            data: {
                email,
            },
        }).then(() => dispatch({
            type: ACCOUNT_RESTORE_PASSWORD_SUCCESS,
        })).catch(error => dispatch({
            type: ACCOUNT_RESTORE_PASSWORD_ERROR,
            payload: error,
        }));
    };
};
