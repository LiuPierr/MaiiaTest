import Webservice from "@api/Webservice"

const actions = {
    fetchList: () => (dispatch: (action: any) => void, getState: () => string): Promise<void> => {
        return Webservice<ListItem[]>('/posts', 'GET').then((res: ListItem) => {
            dispatch({
                type: "FETCH_DATA",
                payload: {
                    data : res
                }
            })
            return res
        })
            .catch((err: any) => {
                dispatch({
                    type: "FETCH_DATA",
                    payload: {
                        data: undefined
                    }
                })
            })
    }
}

export default actions