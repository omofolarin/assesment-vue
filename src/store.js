import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    profile: null,
    isAuthenticated: false,
    token: null,
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
    setUser(state, user) {
      state.profile = user;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, { user, token }) {
      commit("setUser", user);
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("clearUser");
      commit("setToken", null);
    },
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    removeFromCart({ commit }, productId) {
      commit("removeFromCart", productId);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    cartItemCount: (state) => state.cart.length,
    cartTotalPrice: (state) =>
      state.cart.reduce((total, product) => total + product.price, 0),
  },
});
