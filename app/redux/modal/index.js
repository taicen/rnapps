export const types = {
    HIDE_MODAL: null,
    SHOW_MODAL: null
}

export const showModal = ({ modalProps, modalType }) => dispatch => {
    dispatch({
        type: types.SHOW_MODAL,
        modalProps,
        modalType
    })
}

export const hideModal = () => dispatch => {
    dispatch({
        type: types.HIDE_MODAL  
    })
}

export const initialState = {
    modalType: null,
    modalProps: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL: 
            return {
                ...state,
                modalProps: action.modalProps,
                modalType: action.modalType,
                type: action.type
            }
        case types.HIDE_MODAL: 
            return {
                ...state,
            }
        default: 
            return state
    }
}