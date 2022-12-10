import Axios from "axios"

const addURLAPI = async(params: any) => {
  try {
    const { data } = await Axios.post('/api/scraper', params)
    return data
  } catch (e) {
    
  }
}

const getWebsitesList = async(params: any) => {
  try {
    const { data } = await Axios.get('/api/getwebsites', {params})
    return data
  } catch (e) {
    
  }
}

export {
  addURLAPI,
  getWebsitesList
}