// @flow

import { navigatorConstants } from '../constants';

const {
    NAVIGATOR_PUSH,
    NAVIGATOR_REPLACE,
    NAVIGATOR_POP,
    NAVIGATOR_POP_TO_ROUTE,
    NAVIGATOR_UNMOUNT_PREVIOUS_VIEW,
    NAVIGATOR_TRANSITION_ON_STOP,
} = navigatorConstants;

export const push = options => ({
    type: NAVIGATOR_PUSH,
    payload: {
        id: options.id,
        transition: options.transition,
        data: options.data,
    },
});

export const replace = options => ({
    type: NAVIGATOR_REPLACE,
    payload: {
        id: options.id,
        data: options.data,
    },
});

export const pop = () => ({
    type: NAVIGATOR_POP,
});

export const popToRoute = options => ({
    type: NAVIGATOR_POP_TO_ROUTE,
    payload: {
        id: options.id,
        data: options.data,
    },
});

export const unmountPreviousView = () => ({
    type: NAVIGATOR_UNMOUNT_PREVIOUS_VIEW,
});

export const transitionOnStop = routes => ({
    type: NAVIGATOR_TRANSITION_ON_STOP,
    payload: {
        routes,
    },
});
