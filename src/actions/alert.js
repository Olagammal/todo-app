import { DISPLAYALERT } from "../actionTypes"

export const handleAlert = (type, text) => {
    return {
        type: DISPLAYALERT,
        payload: { type: type, text: text }
    }
}