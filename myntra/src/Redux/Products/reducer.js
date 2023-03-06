import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./actionType";

// initial state is defined for products reducer
const initialState = {
    products: [],
    // filteredProducts:[],
    isLoading: false,
    isError: false

}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        // loading request state to show a loadinf icon in order to inform at data is loading
        case GET_PRODUCT_REQUEST:
            return { ...state, isLoading: true }

        //  request success state to show products on to the ui
        case GET_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, products: payload }

        // failure request state to show a fetching data from api failed
        case GET_PRODUCT_FAILURE:
            return { ...state, isLoading: false, isError: true }

        default:
            return state;
    }
}

