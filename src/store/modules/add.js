import axios from "axios";

const state = {
  restaurant: {},
};
const getters = {
  setItem: (state) => state.restaurant,
};
const actions = {
  async addNew({ commit }, restaurant) {
    let response = await axios.post(
      "http://localhost:3000/reststurant",
      restaurant
    );
    commit("Add_Restaurant", response.data);
    return response;
  },
  async updateNew({ commit }, {id,dataToUpdate}) {
    let response = await axios.put(
      `http://localhost:3000/reststurant/${id}`,
      {
        name: dataToUpdate.name,
        Phone: dataToUpdate.Phone,
        Address: dataToUpdate.Address,
        Email: dataToUpdate.Email,
      }
    );
    commit("Update_Restaurant", response.data);
    return response;
  },
};
const mutations = {
  Add_Restaurant(state, restaurant) {
    state.restaurant = restaurant;
  },
  Update_Restaurant(state, restaurant) {
    state.restaurant = restaurant;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
