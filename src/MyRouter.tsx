/* 定义组件路由
 * @author: 杨吉
 * 事件: 2019-12-18
 */
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Boru from './containers/boru/index'
import InsertRecordApp from './containers/boru/insert-record';
import CounterApp from './containers/test/index';
import Shenji from './containers/shenji/index';
import InsertOAApp from './containers/shenji/insert-oa';
import InsertPersonApp from './containers/boru/insert-person';
import QueryRecordApp from './containers/boru/query-record';
import QueryPersonApp from './containers/boru/query-person';
import QueryOAApp from './containers/shenji/query-oa';
import QueryOAHisApp from './containers/shenji/query-oa-his';
import QueryPersonHisApp from './containers/boru/query-person-his';


const MyRouter = () => (
    <Router>
        <Route path="/" render={() =>
            <App>
                <Switch>
                    <Route path="/boru" render={() =>
                        <Boru>
                            <Switch>
                                <Route exact path="/boru/insert-record" component={InsertRecordApp}/>
                                <Route exact path="/boru/insert-person" component={InsertPersonApp}/>
                                <Route exact path="/boru/query-record" component={QueryRecordApp}/>
                                <Route exact path="/boru/query-person" component={QueryPersonApp}/>
                                <Route exact path="/boru/query-person-his" component={QueryPersonHisApp}/>
                                <Route path="/boru" component={InsertRecordApp}/>
                            </Switch>
                        </Boru>
                    }/>
                    <Route path="/shenji" render={() =>
                        <Shenji>
                            <Switch>
                                <Route exact path="/shenji/insert-oa" component={InsertOAApp}/>
                                <Route exact path="/shenji/query-oa" component={QueryOAApp}/>
                                <Route exact path="/shenji/query-oa-his" component={QueryOAHisApp}/>
                                <Route path="/shenji" component={InsertOAApp}/>
                            </Switch>
                        </Shenji>
                    }/>
                    <Route path="/test" component={CounterApp}/>
                </Switch>
            </App>
        }/>
    </Router>
);


export default MyRouter;