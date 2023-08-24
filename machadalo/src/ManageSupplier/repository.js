const URL = 'https://stagingapi.machadalo.com/v0/ui';

function getState() {
  return fetch(`${URL}/state/`, {
    method: 'GET',
    headers: {
      Authorization:
        'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFkbWluQG1hY2hhZGFsby5jb20iLCJ1c2VybmFtZSI6InZpZGhpZGV2ZWxvcG1lbnQiLCJuYW1lIjoiQWRtaW4iLCJleHAiOjE2OTEwNTc4MTYsIm9yaWdfaWF0IjoxNjkwOTcxNDE2fQ.LpL5x-liCjbK6nv_BKVffiUkgjS6Bulm4P0rmGNHgLQ',
    },
  });
}

export const supplierRepository = {
  getState,
};
