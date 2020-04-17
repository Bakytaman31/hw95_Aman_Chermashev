import {
    GET_COCKTAILS_SUCCESS,
    GET_USERS_COCKTAILS_SUCCESS,
    POST_COCKTAIL_FAILURE,
    POST_COCKTAIL_SUCCESS
} from "../actions/cocktailsActions";

const initialState = {
    cocktails: [],
    usersCocktails: [],
    error: null
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COCKTAILS_SUCCESS:
            return {...state, cocktails: action.cocktails};
        case POST_COCKTAIL_FAILURE:
            return {...state, error: action.error};
        case POST_COCKTAIL_SUCCESS:
            return {...state, error: null};
        case GET_USERS_COCKTAILS_SUCCESS:
            return {...state, usersCocktails: action.cocktails};
        default:
            return state;
    }
};

export default cocktailsReducer;