import Webservice from './Webservice'

const api = {
    fetchList: () => Webservice<any[]>('/posts', 'GET'),
}

export default api
