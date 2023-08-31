import { useRecoilState } from 'recoil';

// import { history } from '../_helpers';
import { authAtom } from '../_states/auth';
import { useAlertActions } from '../_actions/alert.actions';
import config from '../../config';
export { useFetchWrapper };

function useFetchWrapper() {
  const auth = useRecoilState(authAtom);
  const alertActions = useAlertActions();

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method) {
    return (url, body, file = false) => {
      const baseUrl = config.API_URL;
      url = `${baseUrl}/${url}`;
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body && file == false) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      } else {
        requestOptions.body = body;
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth[0]?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(config.API_URL);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `JWT ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response) {
    return response.text().then((text) => {
      if (response.status == 500) {
        return alertActions.error('500' + ' ' + response.statusText);
      }
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth[0]?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          alert('Signature has expired')
          localStorage.removeItem('user');
          setAuth(null);
          // history.push('/account/login');
          window.location.href = '/#/logout';
        }
        if ([500].includes(response.status) && auth[0]?.token) {
          alertActions.error('500 Internal Server Error');
        }

        const error = (data && data.message) || response.statusText;
        alertActions.error(error);
        return Promise.reject(error);
      }
      return data;
    });
  }
}
