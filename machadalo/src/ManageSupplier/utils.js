const getToken = () => {
  return localStorage.getItem('JWT');
};

const handlePromise = (response) => {
  return new Promise((resolve, reject) => {
    handleResponse(response)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    let data;
    try {
      data = text && JSON.parse(text);
    } catch (error) {
      return response;
    }
    if (!response.ok) {
      data.status = response.status;
      return data;
    }
    return data;
  });
};

const post = async (url, body) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
};

const get = async (url) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  };
  const response = await fetch(url, requestOptions);
  return handlePromise(response);
};

export const fetchUtils = {
  post,
  get,
};
