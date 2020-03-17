export const types = {
    SET_LOCATION: 'SET_LOCATION'
}

export const setLocation = (data) => ({
    type: types.SET_LOCATION,
    data
})

export const initialState = {
    location: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOCATION: 
            return {
                ...state,
                location: action.data
            }
        default:
            return state
    }
}