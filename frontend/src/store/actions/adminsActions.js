import axiosApi from "../../axiosApi";
import {getCocktails} from "./cocktailsActions";
import {toast} from "react-toastify";

export const publishCocktail = id => {
    return async dispatch => {
        try {
            await axiosApi.post(`/cocktails/${id}`);
            toast.success('Cocktail is published');
            dispatch(getCocktails());
        } catch (e) {
            toast.error("Error");
        }
    }
};

export const deleteCocktail = id => {
    return async dispatch => {
        try {
            await axiosApi.delete(`/cocktails/${id}`);
            toast.success('Cocktail is deleted');
            dispatch(getCocktails());
        } catch (e) {
            toast.error('Error');
        }
    }
};