import axios from 'axios';

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  async function (config) {
    const authData = JSON.parse(localStorage.getItem('authData'));

    if (authData) {
      config.headers['Authorization'] = `Bearer ${authData.accessToken}`;
      config.headers['Access-Control-Allow-Credentials'] = true;
    }
    config.headers['Content-Type'] = 'application/json';
    config.credentials = 'same-origin';
    config.baseURL = import.meta.env.VITE_API_URL;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    let customErrorMessage = 'An unexpected error occurred';

    const customError = {
      message: error.response?.data?.message ?? customErrorMessage,
      status: error.response?.status
    };

    if (error?.response?.status === 403 || error?.response?.status === 401) {
      // logout
    } else if (error?.response?.status >= 500) {
      customError.message = customError;
    }

    throw customError;
  }
);

export default apiClient;
