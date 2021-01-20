declare interface ListItem {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface Data {
    data: ListItem[] | undefined
}

interface actionSetData {
    type: "FETCH_DATA",
    payload: {
        data: ListItem[]
    }
}

declare module "@api"