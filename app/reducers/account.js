// @flow

import { accountConstants } from '../constants';

const {
    ACCOUNT_DEFAULT_SET,
    ACCOUNT_RESET_LOGIN_STATE,
    ACCOUNT_MAKE_SIGN_IN_ACTIVE,
    ACCOUNT_MAKE_SIGN_UP_ACTIVE,
    ACCOUNT_MAKE_FORGOT_PASSWORD_ACTIVE,
    ACCOUNT_SIGN_IN,
    ACCOUNT_SIGN_IN_NETWORK_ERROR,
    ACCOUNT_SIGN_IN_ERROR,
    ACCOUNT_SIGN_IN_SUCCESS,
    ACCOUNT_SIGN_UP,
    ACCOUNT_SIGN_UP_NETWORK_ERROR,
    ACCOUNT_SIGN_UP_ERROR,
    ACCOUNT_SIGN_UP_SUCCESS,
    ACCOUNT_RESTORE_PASSWORD,
    ACCOUNT_RESTORE_PASSWORD_NETWORK_ERROR,
    ACCOUNT_RESTORE_PASSWORD_ERROR,
    ACCOUNT_RESTORE_PASSWORD_SUCCESS,
} = accountConstants;

const DEFAULT = {
    sign_in_is_active: false,
    sign_up_is_active: false,
    forgot_password_is_active: false,
    sign_in_loading: false,
    sign_in_error: null,
    sign_in_network_error: false,
    sign_up_loading: false,
    sign_up_network_error: false,
    sign_up_error: null,
    forgot_password_loading: false,
    forgot_password_network_error: false,
    forgot_password_error: null,
    authorisation: {},
    profile: {},
};

export default (state = DEFAULT, action) => {
    const { type, payload } = action;

    switch (type) {
        case ACCOUNT_DEFAULT_SET:
            return {
                ...DEFAULT,
                ...payload,
            };

        case ACCOUNT_RESET_LOGIN_STATE:
            return {
                ...state,
                sign_in_is_active: false,
                sign_up_is_active: false,
                forgot_password_is_active: false,
            };

        case ACCOUNT_MAKE_SIGN_IN_ACTIVE:
            return {
                ...state,
                sign_in_is_active: true,
                sign_up_is_active: false,
                forgot_password_is_active: false,
                forgot_password_success: false,
            };

        case ACCOUNT_MAKE_SIGN_UP_ACTIVE:
            return {
                ...state,
                sign_in_is_active: false,
                sign_up_is_active: true,
                forgot_password_is_active: false,
            };

        case ACCOUNT_MAKE_FORGOT_PASSWORD_ACTIVE:
            return {
                ...state,
                sign_in_is_active: false,
                sign_up_is_active: false,
                forgot_password_is_active: true,
            };

        case ACCOUNT_SIGN_IN:
            return {
                ...state,
                sign_in_loading: true,
                sign_in_network_error: null,
                sign_in_error: null,
            };

        case ACCOUNT_SIGN_IN_NETWORK_ERROR:
            return {
                ...state,
                sign_in_loading: false,
                sign_in_network_error: true,
            };

        case ACCOUNT_SIGN_IN_ERROR:
            return {
                ...state,
                sign_in_loading: false,
                sign_in_error: payload,
            };

        case ACCOUNT_SIGN_IN_SUCCESS:
            return {
                ...state,
                sign_in_loading: false,
                profile: payload,
                authorisation: {
                    ...state.authorisation,
                    access_token: payload.hash,
                },
            };

        case ACCOUNT_SIGN_UP:
            return {
                ...state,
                sign_up_loading: true,
                sign_up_network_error: null,
                sign_up_error: null,
            };

        case ACCOUNT_SIGN_UP_NETWORK_ERROR:
            return Object.assign({}, state, {
                sign_up_loading: false,
                sign_up_network_error: true,
            });

        case ACCOUNT_SIGN_UP_ERROR:
            return {
                ...state,
                sign_up_loading: false,
                sign_up_error: payload,
            };

        case ACCOUNT_SIGN_UP_SUCCESS:
            return {
                ...state,
                sign_up_loading: false,
                profile: payload,
                authorisation: {
                    ...state.authorisation,
                    access_token: payload.hash,
                },
            };

        case ACCOUNT_RESTORE_PASSWORD:
            return {
                ...state,
                forgot_password_loading: true,
                forgot_password_network_error: null,
                forgot_password_error: null,
            };

        case ACCOUNT_RESTORE_PASSWORD_NETWORK_ERROR:
            return Object.assign({}, state, {
                forgot_password_loading: false,
                forgot_password_network_error: true,
            });

        case ACCOUNT_RESTORE_PASSWORD_ERROR:
            return {
                ...state,
                forgot_password_loading: false,
                forgot_password_error: payload,
            };

        case ACCOUNT_RESTORE_PASSWORD_SUCCESS:
            return {
                ...state,
                forgot_password_loading: false,
                forgot_password_success: true,
            };

        default:
            return state;
    }
};
