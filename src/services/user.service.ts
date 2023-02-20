import axios, { Method } from 'axios'

export class UserService {
  static async request(method: Method, url: string) {
    try {
      const response = await axios.request({
        method,
        url,
      })

      return response.data
    } catch (error) {
      console.log(error)

      return error.response.data
    }
  }

  static async get(url: string) {
    return this.request('get', url)
  }
}
