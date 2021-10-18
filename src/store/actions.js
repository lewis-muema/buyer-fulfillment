import axios from 'axios';

export default {
  // eslint-disable-next-line no-unused-vars
  requestAxiosPost({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve) => {
      axios
        .post(`${payload.app}${payload.endpoint}`, payload.values, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
          return false;
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  requestAxiosGet({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve) => {
      axios
        .get(`${payload.app}${payload.endpoint}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
          return false;
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  requestAxiosPut({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve) => {
      axios
        .put(`${payload.app}${payload.endpoint}`, payload.values, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
          return false;
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  requestAxiosPatch({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve, reject) => {
      axios.patch(`${payload.app}${payload.endpoint}`, payload.values, config).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });
  },
  async updateDeliveryInformation({ dispatch, commit }, payload) {
    try {
      const res = await dispatch('requestAxiosPatch', payload, { root: true });
      commit('setUpdateDelivery', res.data);
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
  async rateOrder({ dispatch, commit }, payload) {
    try {
      const res = await dispatch('requestAxiosPut', payload, { root: true });
      commit('setRateOrder', res.data);
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
};
