import request from 'superagent';

import * as types from './types';

import config from './../config';

//Post Entity
export function postEntityStart() {
  return {
    type: types.POST_ENTITY_START
  };
}

export function postEntitySuccess({ suppliers }) {
  return {
    type: types.POST_ENTITY_SUCCESS,
    suppliers
  };
}

export function postEntityFail() {
  return {
    type: types.POST_ENTITY_FAIL
  };
}

export function postEntity({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntitySuccess());
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);

        dispatch(postEntityFail());
      });
  };
}
