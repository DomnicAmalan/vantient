import Axios from "axios"

const addURLAPI = async(params: any): Promise<any> => {
  try {
    const { data } = await Axios.post('/api/scraper', params)
    return data
  } catch (e) {
    
  }
}

const getWebsitesList = async(params: any): Promise<any> => {
  try {
    const { data } = await Axios.get('/api/getwebsites', {params})
    return data
  } catch (e) {
    
  }
}

const genericApi = async(formData: any, method: string, url: string): Promise<any> => {
  try {
    const data = await Axios({
      method: method, 
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    return data
  } catch (e) {
    return null
  }
}

export {
  addURLAPI,
  getWebsitesList,
  genericApi
}