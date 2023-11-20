import moment from 'moment'

const actionTypes = {
  SET_BACKERS: 'SET_BACKERS',
  CANCEL_BACKERS: 'CANCEL_BACKERS',
  CREATE_BACKER: 'CREATE_BACKER',
  UPDATE_BACKER: 'UPDATE_BACKER',
  SET_LOADING: 'SET_LOADING'
}

const state = () => ({
  backers: undefined,
  loading: false
})

const transformBacker = backer => ({
  ...backer,
  startTime: moment(backer.startDateTime),
  endTime: moment(backer.endDateTime)
})

const mutations = {
  [actionTypes.SET_BACKERS]: (state, { backers }) => {
    state.backers = backers
  },
  [actionTypes.CANCEL_BACKERS]: (state, { ids }) => {
    state.backers = state.backers.filter(backer => {
      if (!ids.includes(backer.id)) return backer
    })
  },
  [actionTypes.CREATE_BACKER]: (state, backer) => {
    if (state.backers) {
      state.backers = [...state.backers, backer]
    }
  },
  [actionTypes.UPDATE_BACKER]: (state, backer) => {
    if (state.backers) {
      state.backers = state.backers.map(e => (e.id === backer.id ? backer : e))
    }
  },
  [actionTypes.SET_LOADING]: (state, loading) => {
    state.loading = loading
  }
}

const actions = {
  async loadBackers({ commit, state }) {
    try {
      commit(actionTypes.SET_LOADING, true)
      const data = await this.$api.backers.list()
      commit(actionTypes.SET_BACKERS, { data })
      commit(actionTypes.SET_LOADING, false)
    } catch (e) {
      commit(actionTypes.SET_LOADING, false)
    }
  },
  async cancelBackers({ commit }, { ids }) {
    await Promise.all(ids.map(id => this.$api.backers.cancel(id)))
    commit(actionTypes.CANCEL_BACKERS, { ids })
  },
  async createBacker({ commit }, payload) {
    console.log('test ', payload)
    try {
      commit(actionTypes.SET_LOADING, true)
      const backer = await this.$api.backers.create(payload)
      commit(actionTypes.SET_LOADING, false)
    } catch (e) {
      commit(actionTypes.SET_LOADING, false)
    }
  },
  async updateBacker({ commit }, { updateBackerCommand, connect, isImageUpdated }) {
    try {
      commit(actionTypes.SET_LOADING, true)
      await this.$api.backers.update(updateBackerCommand, connect, isImageUpdated)
      const data = await this.$api.backers.list(connect)
      const backers = data.map(transformBacker)
      commit(actionTypes.SET_BACKERS, { backers })
      commit(actionTypes.SET_LOADING, false)
    } catch (e) {
      commit(actionTypes.SET_LOADING, false)
    }
  }
}

const getters = {
  getBackers: state => {
    const { backers } = state
    if (!backers) return undefined

    return [{ id: 1, name: 'name', status: 'status' }]
    // return backers
  },
  loading: state => {
    const { loading } = state
    return loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
