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
    return new Promise((resolve) => {
      axios
        .patch(`${payload.app}${payload.endpoint}`, payload.values, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
          return false;
        });
    });
  },
};
