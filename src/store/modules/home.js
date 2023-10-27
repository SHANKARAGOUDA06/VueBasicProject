import axios from "axios";

const state = () => ({
  restaurant: [],
});

const getters = {
  allRestrurant: (state) => state.restaurant,
};

const actions = {
  async getRestaurant({ commit }) {
    let response = await axios.get("http://localhost:3000/reststurant");
    commit("Set_Restaurant", response.data);
  },
  async deleteItem({ commit }, id) {
    let response = await axios.delete(
      "http://localhost:3000/reststurant/" + id
    );
    commit("Remove_Item", id);
    return response;
  },
};

const mutations = {
  Set_Restaurant(state, restaurant) {
    state.restaurant = restaurant;
  },
  Remove_Item(state, id) {
    state.restaurant = state.restaurant.filter((item) => item.id !== id);
  },
};
  export default {
  state,
  getters,
  mutations,
  actions,
};
