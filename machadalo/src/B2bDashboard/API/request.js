// import axios from 'axios';
import config from '../../config';

export const requestWithToken = (data, action, method) => {
  // let sessionToken = JSON.parse(localStorage.getItem(['machadalo-credentials'])).token;
  // return axios({
  //   method: method,
  //   url: config.API_URL + action,
  //   headers: {
  //     Authorization: 'JWT ' + sessionToken,
  //     'Content-Type': 'application/json',
  //   },
  //   data: data,
  // });
};

export const getRequestWithToken = (data, action) => requestWithToken(data, action, 'GET');
export const postRequestWithToken = (data, action) => requestWithToken(data, action, 'Post');

