import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./../Reducers/index";


export const Store  = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
    )
);



