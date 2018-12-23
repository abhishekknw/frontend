import request from 'superagent';

import * as types from './types';

import config from './../config';

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
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
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

//Post Entity
export function postEntityStart() {
  return {
    type: types.POST_ENTITY_START
  };
}

export function postEntitySuccess(entity) {
  return {
    type: types.POST_ENTITY_SUCCESS,
    data: entity
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
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntitySuccess(resp.data));
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
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
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

//Get Entity List
export function getEntityListStart() {
  return {
    type: types.GET_ENTITY_LIST_START
  };
}

export function getEntityListSuccess(entityList) {
  return {
    type: types.GET_ENTITY_LIST_SUCCESS,
    data: entityList
  };
}

export function getEntityListFail() {
  return {
    type: types.GET_ENTITY_LIST_FAIL
  };
}

export function getEntityList() {
  return (dispatch, getState) => {
    dispatch(getEntityListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntityListSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityListFail());
      });
  };
}

//Delete Entity
export function deleteEntityStart() {
  return {
    type: types.DELETE_ENTITY_START
  };
}

export function deleteEntitySuccess(entityId) {
  return {
    type: types.DELETE_ENTITY_SUCCESS,
    entityId
  };
}

export function deleteEntityFail() {
  return {
    type: types.DELETE_ENTITY_FAIL
  };
}

export function deleteEntity(entityId, callback) {
  return (dispatch, getState) => {
    dispatch(deleteEntityStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/dynamic-entities/entity/${entityId}`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteEntitySuccess(entityId));
        dispatch(getEntityList());
        callback();
      })
      .catch(ex => {
        console.log('Failed to delete entity', ex);

        dispatch(deleteEntityFail());
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

export function getEntityTypeSuccess(entityTypeId) {
  return {
    type: types.GET_CURRENT_ENTITY_TYPE_SUCCESS,
    data: entityTypeId
  };
}

export function getEntityTypeFail() {
  return {
    type: types.GET_CURRENT_ENTITY_TYPE_FAIL
  };
}

export function getEntityType() {
  return (dispatch, getState) => {
    dispatch(getEntityTypeStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntityTypeSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityTypeFail());
      });
  };
}

//Get Current Entity
export function getEntityStart() {
  return {
    type: types.GET_CURRENT_ENTITY_START
  };
}

export function getEntitySuccess(entityId) {
  return {
    type: types.GET_CURRENT_ENTITY_SUCCESS,
    data: entityId
  };
}

export function getEntityFail() {
  return {
    type: types.GET_CURRENT_ENTITY_FAIL
  };
}

export function getEntity() {
  return (dispatch, getState) => {
    dispatch(getEntityStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntitySuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityFail());
      });
  };
}
