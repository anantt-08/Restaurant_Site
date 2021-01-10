//function incrementIfOdd() {
 // return (dispatch, getState) => {
// console.log(getState())  
// const { counter } = getState();

   // if (counter % 2 === 0) {
    //  return;
    //}

   // dispatch(increment());
  //};
//}
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import {browserHistory } from "react-router";

export const postFeedback = (
  firstname,
  lastname,
  telnum,
  email,
  agree,
  contactType,
  message
) => dispatch => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };

  return fetch(baseUrl + "FEEDback", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response =>
      {
        //response.text()
      	alert("Thank you for your feedback!" + JSON.stringify(response));
    }
    )
    .catch(error => {
      console.log("post feedbacks", error.message);
      alert("Your feedback could not be posted\nError: " + error.message);
    });
};
export const postComment = (comment) => ({
    type: ActionTypes.POST_COMMENT,
    payload: comment
});

export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message :message
    }
}
export const signupsuccess=()=>{
  return {
    type: ActionTypes.SIGNUP_SUCCESS
  }
}
export const signupreq = () => {
    return {
      type: ActionTypes.SIGNUP_REQUEST
    }
}
export const signupUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(signupreq())

     return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusCode);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
  .then(response => response.json())
    .then(response => {
        if(response.success) {
            // If login was successful, set the token in local storage
             dispatch(success('Registration successful'));
            dispatch(signupsuccess())
          }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error =>{ 
      dispatch(ERror(error.message.toString()));
      dispatch(signupError(error.message));
    })
};

export const success= (message) => {
    return { type: ActionTypes.SUCCESS, message };
}

export const ERror= (message) =>{
    return { type: ActionTypes.ERROR, message };
}

export const clear= () =>{
    return { type: ActionTypes.CLEAR };
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })

    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
  .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(success('Login successful'));
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error =>{
        dispatch(ERror(error.message.toString()));
    dispatch(loginError(error.message))
    } )
};


export const addComment = (dishId, rating, author, comment) => (dispatch) => {

     const newComment = {
        dish: dishId,
        rating: rating,
        author:author,
        comment: comment
    }
    //id  by default on its own

    console.log(JSON.stringify(newComment))
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
         })
    .then(response => response.json())
    .then(comm => dispatch(postComment(comm)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

//  thunk middleware which return a function taking dispatch and getstate inbuiltt takes zero parameter
export const fetchDishes = () => (dispatch,getState) => {
   
    //dispatch takes action creator as an object!! like dispatch({type:...}) which is there inn action creator
    dispatch(dishesLoading());

        return fetch(baseUrl + 'dishes')
     .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(showDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));

 //   setTimeout(() => {
   //     console.log("before dispatch",getState())
    //    dispatch(showDishes(DISHES));
   // }, 2000);
}

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(showComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
     .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(showPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}
export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
     .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(leaders => dispatch(showLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const showLeaders = (leaders) => ({
    type: ActionTypes.SHOW_LEADERS,
    payload: leaders
});

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const showDishes = (dishes) => ({
    type: ActionTypes.SHOW_DISHES,
    payload: dishes
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const showComments = (comments) => ({
    type: ActionTypes.SHOW_COMMENTS,
    payload: comments
});
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const showPromos = (promos) => ({
    type: ActionTypes.SHOW_PROMOS,
    payload: promos
});

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const showFavorites = (favorites) => ({
    type: ActionTypes.SHOW_FAVORITES,
    payload: favorites
});

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(showFavorites(favorites)))
    .catch(error => {dispatch(favoritesFailed(error.message))
    });
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites);  dispatch(showFavorites(favorites));
     })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

//direct can call showfavourites as returns update favorite list not like comment which return single comment!! which is posted
export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    //then in response we get favourite.user AND favourites.dishes populated!
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(showFavorites(favorites)); 
  })
    .catch(error => { dispatch(favoritesFailed(error.message))
dispatch(ERror(error.message.toString()));
    });
}

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds:creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message :message
    }
}

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}


export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
       dispatch(success('LogOut successful'));
    dispatch(receiveLogout())
}