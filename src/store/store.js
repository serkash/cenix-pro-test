import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  posts: null,
  search: null,
  latestPosts: []
}

const getters = {
  getPosts: state => state.posts,
  getLatestPosts: state => state.latestPosts,
  getSearch: state => state.search
}

const mutations = {
  setPosts (state, posts) {
    state.posts = posts
  },
  setLatestPosts (state, latestPosts) {
    const currentLatestPosts = state.latestPosts
    latestPosts.forEach(element => {
      currentLatestPosts.push(element)
    });
  },
  addPost (state, post) {
    const posts = state.posts
    posts.unshift(post)
  },
  setSearch (state, searchText) {
    const posts = state.posts
    if (searchText) {
      const searchResults = posts.filter(element => element.name.includes(searchText))
      state.search = searchResults
    } else {
      state.search = null
    }
  },
  changePostName (state, {postId, postName}) {
    const posts = state.posts
    const post = posts.find(element => element.id === postId)
    post.name = postName
  }
}

const actions = {
  async setPosts ({commit}, posts) {
    const latestPosts = posts.slice(0, 30)
    commit('setPosts', posts)
    commit('setLatestPosts', latestPosts)
  },
  async setLatestPosts ({commit}, {posts, currentIndex}) {
    const latestPosts = posts.slice(currentIndex, currentIndex + 30)
    commit('setLatestPosts', latestPosts)
  },
  async addPost ({commit}, post) {
    commit('addPost', post)
  },
  async setSearch ({commit}, searchText) {
    commit ('setSearch', searchText)
  },
  async changePostName ({commit}, {postId, postName}) {
    commit('changePostName', {postId, postName})
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})