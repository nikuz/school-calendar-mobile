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

const initialState = {
    id: 'home',
    routes: ['home'],
    type: null,
    transition: null,
    data: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case NAVIGATOR_PUSH: {
            if (payload.id === state.id) { // if trying to push the same route
                return state;
            }

            const routes = state.routes.slice(0);
            routes.push(payload.id);

            return {
                ...state,
                id: payload.id,
                routes,
                type: 'push',
                transition: payload.transition,
                data: payload.data || {},
            };
        }

        case NAVIGATOR_REPLACE: {
            const routes = state.routes.slice(0);
            routes.splice(routes.length - 1, 1, payload.id);

            return {
                ...state,
                id: payload.id,
                routes,
                type: 'replace',
                data: payload.data || {},
            };
        }

        case NAVIGATOR_POP: {
            const routes = state.routes.slice(0);

            routes.pop();

            return {
                ...state,
                id: routes[routes.length - 1],
                routes,
                type: 'pop',
            };
        }

        case NAVIGATOR_POP_TO_ROUTE: {
            const routes = state.routes.slice(0);
            routes.push(payload.id);

            return {
                ...state,
                id: payload.id,
                routes,
                type: 'pop_to_route',
                data: payload.data || {},
            };
        }

        case NAVIGATOR_UNMOUNT_PREVIOUS_VIEW: {
            const routes = state.routes.slice(0);
            routes.splice(routes.length - 2, 1, 'blank');

            return {
                ...state,
                routes,
                type: 'unmount_previous',
            };
        }

        case NAVIGATOR_TRANSITION_ON_STOP: {
            const routes = payload.routes;
            const curRoute = routes[routes.length - 1];
            if (curRoute.routeName !== state.id) {
                const stateRoutes = state.routes.slice(0);

                stateRoutes.pop();

                return {
                    ...state,
                    id: stateRoutes[stateRoutes.length - 1],
                    routes: stateRoutes,
                    type: 'pop',
                };
            }

            return state;
        }

        default:
            return state;
    }
};
