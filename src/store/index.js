﻿import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
        isGetterRouter: false,
        isCollapsed: false,
        userInfo: {}
  },
  getters: {
  },
    mutations: {
        changeGetterRouter(state, value) {
            state.isGetterRouter = value
        },
        // 控制側邊欄位展開
        changeCollapsed(state) {
            state.isCollapsed = !state.isCollapsed;
        },
        changeUserInfo(state, value) {
            state.userInfo = {
                ...state.userInfo,
                ...value

            }
        },
        clearUserInfo(state, value) {
            state.userInfo = {}
        }

  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
        // 控制是否要持久化
        paths: ['isCollapsed', 'userInfo']
  })]


})
