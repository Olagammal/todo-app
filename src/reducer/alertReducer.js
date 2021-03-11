import { DISPLAYALERT } from "../actionTypes"

const initialState = {
    alertType: "error",
    alertText: "there is an error",
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAYALERT:
            return { ...state, alertType: action.payload.type, alertText: action.payload.text }
        default:
            return state
    }
}

export default alertReducer