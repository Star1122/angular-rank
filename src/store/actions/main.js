import mainService from 'services/main.service';
import storageService from 'services/storage.service';
import * as actionTypes from '../actionTypes';

export const getAllContributors = (org, repo) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_CONTRIBUTORS_REQUEST,
  });

  try {
    let data = [];
    let page = 1;
    let result = await mainService.getAllContributors(org, repo, page);
    while (result.length > 0) {
      data = data.concat(result);
      page += 1;
      // eslint-disable-next-line no-await-in-loop
      result = await mainService.getAllContributors(org, repo, page);
    }

    dispatch({
      type: actionTypes.GET_ALL_CONTRIBUTORS_SUCCESS,
      payload: { org, repo, data },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.GET_ALL_CONTRIBUTORS_FAILURE,
    });
  }
};

export const getAllRepositories = (org) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_REPOSITORIES_REQUEST,
  });

  try {
    let data = [];
    let page = 1;
    let result = await mainService.getAllRepositories(org, page);
    while (result.length > 0) {
      data = data.concat(result);
      page += 1;
      // eslint-disable-next-line no-await-in-loop
      result = await mainService.getAllRepositories(org, page);
    }

    dispatch({
      type: actionTypes.GET_ALL_REPOSITORIES_SUCCESS,
      payload: { org, data },
    });

    data.forEach((repo) => {
      dispatch(getAllContributors(org, repo.name));
    });
  } catch (e) {
    dispatch({
      type: actionTypes.GET_ALL_REPOSITORIES_FAILURE,
    });
  }
};

export const install = (org) => async (dispatch) => {
  try {
    const data = await mainService.installAccessToken();

    storageService.setItem('access_token', data.token);

    dispatch(getAllRepositories(org));
  } catch (e) {
    console.log(e);
  }
};
