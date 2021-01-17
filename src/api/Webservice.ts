import axios from 'axios'

const MAX_TIMEOUT = 15000
const SERVER_PREFIX = 'https://jsonplaceholder.typicode.com'

type CODE = 'network' | 'server' | 'client' | 'session'

class ApiError extends Error {
    constructor(message: string, code: CODE) {
        super(message)
    }
}

const execute = <T>(path: string, method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH', body?: any): Promise<T> => {
    const headers: { [key: string]: string } = {
        'content-type': 'application/json',
    }

    // cancel Token used for Timeout
    const cancelToken = axios.CancelToken.source()
    setTimeout(cancelToken.cancel, MAX_TIMEOUT)

    return axios
        .request<T>({
            cancelToken: cancelToken.token,
            url: SERVER_PREFIX + path,
            method: method,
            headers,
            data: body ? JSON.stringify(body) : undefined,
            timeout: MAX_TIMEOUT,
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            // Network error (no internet, server down, ...)
            throw new ApiError(err.message, 'network')
        })
}

export default execute
