import axios from 'axios';
import { AxiosInstance } from './config/ApiConfig';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';



// You can also define interceptors for the AxiosInstance
AxiosInstance.interceptors.request.use(
  (config) => {
    
    // Do something before sending the request
    const user = JSON.parse(localStorage.getItem('user') as string);
      
      if (user !== null ) {
      //  config.headers['auth-token'] = user.token;
        config.headers.Authorization = `Bearer ${user.token}`
      }
    console.log('Request interceptor', config);
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the successful response
    console.log('Response interceptor', response);
    if (response.data.message && response.data.message.includes('404')) {
      window.location.href = '/auth/login';
    }
    return response;
  },
  (error) => {
    console.log('Response interceptor error', error);
    if(error.response.status === 401){
      localStorage.removeItem('user');
      window.location.href = '/auth/login'
    }
    // Do something with the response error
    return Promise.reject(error);
  }
);

export default AxiosInstance;