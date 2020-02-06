import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRouter from './MyRouter';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

const store = configureStore();

ReactDOM.render( //关联store
    <Provider store={store}>
        <MyRouter/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
