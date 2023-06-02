const baseUrl = 'https://fakestoreapi.com'
// const token = JSON.parse(localStorage.getItem('token')) || '1234'
export default {
  async fetchApi (url, method = 'GET', data) {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      //Authorization: `Bearer ${token}`
    }
    const body = JSON.stringify(data)
    const response = await fetch(`${baseUrl}/${url}`, {
      method,
      body,
      headers
    })
    const result = await response.json()
    if (process.env.NODE_ENV === 'development') {
      // console.log(response)
      // console.log(result)
    }
    if (!response.ok) {
      // console.log(result)
      throw result.detail ? result.detail : result
    }
    return result
  }
}
