import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import promiseMiddleware from '../middlewares/promise-middleware';
import CounterReducer from './reducers/test';
import ShenjiReducer from './reducers/shenji';
import CommonReducer from './reducers/commonReducers';
import BoruReducer from './reducers/boruReducers'
import LoginReducer from "./reducers/loginReducers";

const reducer = combineReducers({
    counterReducer: CounterReducer,
    shenjiReducer: ShenjiReducer,
    commonReducer: CommonReducer,
    boruReducer: BoruReducer,
    loginReducer: LoginReducer,
})


const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(
        thunkMiddleware,
        promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
    ),
);


export default function configureStore(initialState = {}) {
    return createStore(
        reducer,
        initialState,
        enhancer
    );
}