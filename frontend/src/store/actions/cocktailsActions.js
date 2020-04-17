import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from 'react-toastify';

export const GET_COCKTAILS_SUCCESS = 'GET_COCKTAILS_SUCCESS';

export const GET_USERS_COCKTAILS_SUCCESS = 'GET_USERS_COCKTAILS_SUCCESS';

export const POST_COCKTAIL_SUCCESS = 'POST_COCKTAIL_SUCCESS';
export const POST_COCKTAIL_FAILURE = 'POST_COCKTAIL_FAILURE';

export const getCocktailsSuccess = cocktails => ({type: GET_COCKTAILS_SUCCESS, cocktails});
export const getUsersCocktailsSuccess = cocktails => ({type: GET_USERS_COCKTAILS_SUCCESS, cocktails});
export const postCocktailsSuccess = () => ({type: POST_COCKTAIL_SUCCESS});
export const postCocktailsFailure = error => ({type: POST_COCKTAIL_FAILURE, error});

export const getCocktails = () => {
    return async dispatch => {
        const response = await axiosApi.get('/cocktails');
        dispatch(getCocktailsSuccess(response.data));
    }
};

export const getUsersCocktails = () => {
    return async dispatch => {
        const response = await axiosApi.get('/cocktails/myCocktails');
        dispatch(getUsersCocktailsSuccess(response.data));
    }
};

export const postCocktail = cocktail => {
    return async dispatch => {
        try {
            await axiosApi.post('/cocktails', cocktail);
            dispatch(postCocktailsSuccess());
            toast.success('Success');
            dispatch(push('/'));
        } catch (e) {
            dispatch(postCocktailsFailure(e.response.data.message));
            toast.error('Error');
        }
    }
};