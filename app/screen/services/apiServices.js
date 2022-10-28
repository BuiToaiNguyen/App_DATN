import axios from 'axios';
const GLOBAL_API = {
  requestPOST_WSO2: async (urlService, tokenBearer, data) => {
    return await axios
      .post(urlService, data, {
        headers: {Authorization: 'Bearer ' + tokenBearer},
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return {data: null};
      });
  },

  requestPOST: async (urlService, data) => {
    return await axios
      .post(urlService, data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return {data: null};
      });
  },

  requestPOSTRoot: async (urlService, data) => {
    return await axios
      .post(urlService, data, {
        headers: {
          tenant: 'root',
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return {data: null};
      });
  },

  requestGET: async urlService => {
    return await axios
      .get(urlService)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return {data: null};
      });
  },
};

export default GLOBAL_API;
