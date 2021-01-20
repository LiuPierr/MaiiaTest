const initialState : Data = {
    data: undefined
}

const reducer = (state = initialState, action: actionSetData) => {
    switch(action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                data: action.payload.data.sort( (a, b) => {
                    const textA = a.title.toUpperCase()
                    const textB = b.title.toUpperCase()
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                } )
            };
        default:
            return state;
    }
}
export default reducer