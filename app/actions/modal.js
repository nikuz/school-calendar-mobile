// @flow

import { modalConstants } from '../constants';

const {
    MODAL_OPEN,
    MODAL_CLOSE,
} = modalConstants;

export const open = ({ content, callback, direction, showCloseIcon, contentTransparentBg }) => ({
    type: MODAL_OPEN,
    payload: {
        content,
        callback,
        direction,
        showCloseIcon,
        contentTransparentBg,
    },
});

export const close = ({ callback, all } = {}) => ({
    type: MODAL_CLOSE,
    payload: {
        callback,
        closeAll: all,
    },
});
