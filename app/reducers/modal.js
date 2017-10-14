// @flow

import { modalConstants } from '../constants';

const {
    MODAL_OPEN,
    MODAL_CLOSE,
} = modalConstants;

const initialState = {
    overlays: [],
    closeCallback: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case MODAL_OPEN: {
            const overlays = state.overlays.slice(0);
            const showCloseIcon = payload.showCloseIcon;

            overlays.push({
                content: payload.content,
                callback: payload.callback,
                direction: payload.direction || 'top',
                showCloseIcon: showCloseIcon !== undefined ? showCloseIcon : true,
                contentTransparentBg: payload.contentTransparentBg || false,
            });
            return {
                ...state,
                overlays,
            };
        }
        case MODAL_CLOSE: {
            let overlays = state.overlays.slice(0);
            if (payload.closeAll) {
                overlays = [];
            } else {
                overlays.pop();
            }
            return {
                ...state,
                overlays,
                closeCallback: payload.callback,
            };
        }
        default:
            return state;
    }
};
