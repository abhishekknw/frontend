import request from 'superagent';

import * as types from './../types';

import config from './../../config';

//Post Entity Type
export function postEntityTypeStart() {
  return {
    type: types.POST_ENTITY_TYPE_START
  };
}

export function postEntityTypeSuccess(entity) {
  return {
    type: types.POST_ENTITY_TYPE_SUCCESS,
    data: entity
  };
}

export function postEntityTypeFail() {
  return {
    type: types.POST_ENTITY_TYPE_FAIL
  };
}

export function postEntityType({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityTypeStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity-type/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntityTypeSuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);

        dispatch(postEntityTypeFail());
      });
  };
}

//Get Entity Type List
export function getEntityTypeListStart() {
  return {
    type: types.GET_ENTITY_TYPE_LIST_START
  };
}

export function getEntityTypeListSuccess(entityTypeList) {
  return {
    type: types.GET_ENTITY_TYPE_LIST_SUCCESS,
    data: entityTypeList
  };
}

export function getEntityTypeListFail() {
  return {
    type: types.GET_ENTITY_TYPE_LIST_FAIL
  };
}

export function getEntityTypeList() {
  return (dispatch, getState) => {
    dispatch(getEntityTypeListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity-type/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntityTypeListSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityTypeListFail());
      });
  };
}

//Delete Entity Type
export function deleteEntityTypeStart() {
  return {
    type: types.DELETE_ENTITY_TYPE_START
  };
}

export function deleteEntityTypeSuccess(entityTypeId) {
  return {
    type: types.DELETE_ENTITY_TYPE_SUCCESS,
    entityTypeId
  };
}

export function deleteEntityTypeFail() {
  return {
    type: types.DELETE_ENTITY_TYPE_FAIL
  };
}

export function deleteEntityType(entityTypeId, callback) {
  return (dispatch, getState) => {
    dispatch(deleteEntityTypeStart());

    const { auth } = getState();

    request
      .delete(
        `${config.API_URL}/v0/ui/dynamic-entities/entity-type/${entityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteEntityTypeSuccess(entityTypeId));
        dispatch(getEntityTypeList());
        callback();
      })
      .catch(ex => {
        console.log('Failed to delete entity type', ex);

        dispatch(deleteEntityTypeFail());
      });
  };
}

//Get Entity Type List
export function getEntityTypeStart() {
  return {
    type: types.GET_CURRENT_ENTITY_TYPE_START
  };
}

export function getEntityTypeSuccess(entityType) {
  return {
    type: types.GET_CURRENT_ENTITY_TYPE_SUCCESS,
    data: entityType
  };
}

export function getEntityTypeFail() {
  return {
    type: types.GET_CURRENT_ENTITY_TYPE_FAIL
  };
}

export function getEntityType(entityTypeId) {
  return (dispatch, getState) => {
    dispatch(getEntityTypeStart());

    const { auth } = getState();

    request
      .get(
        `${config.API_URL}/v0/ui/dynamic-entities/entity-type/${entityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        console.log(resp.body);
        dispatch(getEntityTypeSuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityTypeFail());
      });
  };
}

export function updateEntityType({ data, entityTypeId }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityTypeStart());

    const { auth } = getState();

    request
      .put(
        `${config.API_URL}/v0/ui/dynamic-entities/entity-type/${entityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntityTypeSuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);

        dispatch(postEntityTypeFail());
      });
  };
}
