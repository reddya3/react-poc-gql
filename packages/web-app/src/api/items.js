import axios from 'axios'

export const getItems = apiPath => async () => (await axios.get(`${apiPath}/items`)).data
