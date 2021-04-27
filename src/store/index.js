import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    error: null
  },
  getters: {
    auth: state => state.loggedIn,
    error: state => state.error
  },
  mutations: {
    userAuth(state) {
      state.loggedIn = true
    },
    userLogout(state) {
      state.loggedIn = false
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async signInByCode({ dispatch, commit }, userCode) {

      try {
        const response = await this._vm.$api.auth.signIn();
        console.log(response);
        const authAccess = response.data.code.includes(userCode);
        if (authAccess) {
          commit("userAuth")
          localStorage.setItem('logged_in', true)
        }
      }
      catch (e) {
        commit('setError', e)
        throw e
      }
    },

    signOut({ dispatch, commit }) {
      commit("userLogout")
      localStorage.setItem('logged_in', false)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
