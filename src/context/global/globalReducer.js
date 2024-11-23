import {
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    TOGGLE_SIDEBAR
} from '../../common/types'

export default (state, action) => {

    switch (action.type) {
        case SET_LOADING_TRUE:
            return { ...state, loading: true };
        case SET_LOADING_FALSE:
            return { ...state, loading: false };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen }; // Alternar el estado del sidebar
        default:
            return state;
    }
}