import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from 'react-toastify';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});


export const loginWithFacebook = facebookData => {
    return async dispatch => {
        const response = await axiosApi.post('/users/facebook', facebookData);

        toast.success('Logged in with Facebook');
        dispatch(loginUserSuccess(response.data));
        dispatch(push('/'));
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginUserFailure(error.response.data.error));
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        await axiosApi.delete('/users/sessions');

        toast.success('Logged out');
        dispatch(push('/'));
        dispatch(logoutUserSuccess());
    }
};