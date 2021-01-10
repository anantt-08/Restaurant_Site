//SIGNUP COMMENTS EDIT DELETE(VIEW YOUR COMMENT)
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';
import { createForms } from 'react-redux-form';
import { Auth } from './auth';
import { alert } from './alert';
export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            favorites:favorites,
             auth: Auth,
             alert:alert,
            ...createForms({
                FEEDback: InitialFeedback
            })
        }),  applyMiddleware(thunk, logger)
    );

    return store;
}