import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/v1';
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if(config.url==='/auth'){
      document.getElementById('overlay').style.display = 'block';
    }

    return config;
  },
  function (error) {
    document.getElementById('overlay').style.display = 'none';
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    document.getElementById('overlay').style.display = 'none';
    //console.log('res');
    return response;
  },
  async function (error) {
    if(error && error.response === undefined) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      window.location = "/login";
    }

    if (error.response.data?.errors?.error.name === 'JsonWebTokenError' ) {
      await axios
         .get(`${baseUrl}/auth/refresh-token`,{
           headers: {
             Authorization: localStorage.getItem('refresh_token'),
           },
         })
         .then((res) => {
           if(res.data?.data?.token){
             localStorage.setItem(
               'auth_token',
               res.data.data.token,
             );
             localStorage.setItem(
               'refresh_token',
               res.data.data.refresh_token,
             );
           }
         });

         const oldRequest = error.config;
        oldRequest._retry = true;
        oldRequest.headers['Authorization']=localStorage.getItem('auth_token');
        return axios(oldRequest);
    }


    document.getElementById('overlay').style.display = 'none';
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
