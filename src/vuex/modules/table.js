import {
  UPDATE_TABEL_LODAING,
  USER_LIST_PAGE,
  SET_TABLE_PAGE
} from '../types'
import api from '../api'

const state = {
  listLoading: false,
  users: [],
  page: 1,
  total: 0,
  filters: {
    name: ''
  }
}

const getters = {
  getListLoading: state => state.listLoading,
  getUsersList: state => state.users,
  getPage: state => state.page,
  getTotal: state => state.total,
  getFilters: state => state.filters
}

const actions = {
  // 获取用户列表
  async getUserListPage ({
    commit,
    state
  }) {
    commit('UPDATE_TABEL_LODAING')
    let res = await api.userListPage({
      page: state.page,
      name: state.filters.name
    })
    await commit(USER_LIST_PAGE, res)
    commit('UPDATE_TABEL_LODAING')
  },
  // 批量删除用户
  async removeUsers ({
    commit,
    dispatch,
    state
  }, {
    context,
    ids
  }) {
    commit('UPDATE_TABEL_LODAING')
    await api.batchRemoveUser({ ids })
    context.$message({
      message: '删除成功',
      type: 'success'
    })
    commit('UPDATE_TABEL_LODAING')
    dispatch('getUserListPage')
  },
  setPage: ({ commit }, page) => commit('SET_TABLE_PAGE', page),
  // 编辑
  async editUser ({
    commit,
    state
  }, {
    context,
    params
  }) {
    context.ShowEditForm = false
    commit('UPDATE_TABEL_LODAING')
    await api.editUser(params)
    context.$message({
      message: '编辑成功',
      type: 'success'
    })
    context.$refs['editForm'].resetFields()
    commit('UPDATE_TABEL_LODAING')
  },
  // 单个删除
  async removeUser ({
    commit,
    dispatch,
    state
  }, {
    context,
    id
  }) {
    context.ShowEditForm = false
    commit('UPDATE_TABEL_LODAING')
    await api.removeUser({ id })
    context.$message({
      message: '删除成功',
      type: 'success'
    })
    commit('UPDATE_TABEL_LODAING')
    dispatch('getUserListPage')
  },
  // 新增
  async addUser ({
    commit,
    dispatch,
    state
  }, {
    context,
    params
  }) {
    context.showAddForm = false
    commit('UPDATE_TABEL_LODAING')
    await api.addUser(params)
    context.$message({
      message: '新增成功',
      type: 'success'
    })
    context.$refs['addForm'].resetFields()
    commit('UPDATE_TABEL_LODAING')
    dispatch('getUserListPage')
  }
}

const mutations = {
  [USER_LIST_PAGE] (state, res) {
    state.users = res.data.users
    state.total = res.data.total
  },
  [SET_TABLE_PAGE] (state, page) {
    state.page = page
  },
  [UPDATE_TABEL_LODAING] (state) {
    state.listLoading = !state.listLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
