import "whatwg-fetch";
import Config from "react-native-config";
/**
 * TODO
 * add react-native-config
 */

export const types = {
    SHOW_OVERLAY: 'SHOW_OVERLAY',
    HIDE_OVERLAY: 'HIDE_OVERLAY',
    SHOW_IN_PROGRESS: 'SHOW_IN_PROGRESS',
    HIDE_IN_PROGRESS: 'HIDE_IN_PROGRESS',
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE'
}

export const showOverlay = () => ({
    type: types.SHOW_OVERLAY
});

export const hideOverlay = () => ({
    type: types.HIDE_OVERLAY
});

export const showInProgress = () => ({
    type: types.SHOW_IN_PROGRESS,
});

export const hideInProgress = () => ({
    type: types.HIDE_IN_PROGRESS
});

export const showMessage = (data) => ({
    type: types.SHOW_MESSAGE,
    data
});

export const hideMessage = () => ({
    type: types.HIDE_MESSAGE
});

export const initialState = {
    overlayIsShown: false,
    appInProgress: false,
    resultMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_OVERLAY:
            return {
                ...state,
                overlayIsShown: true
            }
        case types.HIDE_OVERLAY:
            return {
                ...state,
                overlayIsShown: false
            }
        case types.SHOW_IN_PROGRESS:
            return {
                ...state,
                appInProgress: true
            }
        case types.HIDE_IN_PROGRESS:
            return {
                ...state,
                appInProgress: false
            }
        case types.SHOW_MESSAGE:
            return {
                ...state,
                resultMessage: action.data
            }
        case types.HIDE_MESSAGE:
            return {
                ...state,
                resultMessage: null
            }
        default:
            return state
    }
}