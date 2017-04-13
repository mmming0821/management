import axios from 'axios'

let baseUrl = ''

export default {
  userListPage: params => axios.get(`${baseUrl}/user/listpage`, params),
  batchRemoveUser: params => axios.get(`${baseUrl}/user/batchremove`, params),
  editUser: params => axios.get(`${baseUrl}/user/edit`, params),
  removeUser: params => axios.get(`${baseUrl}/user/removeuser`, params),
  addUser: params => axios.get(`${baseUrl}/user/adduser`, params)
}
