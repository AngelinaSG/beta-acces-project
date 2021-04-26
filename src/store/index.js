import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
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
        const response = await axios.get("./server/codes.json");
        const authAccess = response.data.code.includes(userCode);
        if (authAccess) {
          commit("userAuth")
        }
      }
      catch (e) {

      }
    },

    signOut({ dispatch, commit }) {
      commit("userLogout")
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
