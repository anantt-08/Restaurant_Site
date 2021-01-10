//here are reducer func which modifies state received from dispatch from react or middleware!
import * as ActionTypes from './ActionTypes';
// must REturn mutable state means NEW ARRAY OF STATE! by concat or {...state,}
//return Object.assign({},state, {new state hereee}) this func can also be used!  

//no need of loading!!
export const Comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.POST_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};