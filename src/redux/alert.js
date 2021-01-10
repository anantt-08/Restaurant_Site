import * as ActionTypes from './ActionTypes';

export const alert = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case ActionTypes.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case ActionTypes.CLEAR:
      return {};
    default:
      return state
  }
}