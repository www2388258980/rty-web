/* 定义组件路由
 * @author: 杨吉
 * 事件: 2019-12-18
 */
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
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
import {connect,} from "react-redux";
import {Dispatch} from "redux";
import LoginApp from "./containers/login";

import {message} from 'antd';


export interface MyRouterProps {
    isLogin: boolean;
}

export interface MyRouterStates {

}

class MyRouter extends React.Component<MyRouterProps, MyRouterStates> {
    state = {}


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string |
        number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {isLogin} = this.props;
        return (
            <Router>
                <Route path="/">
                    <Switch>
                        <Route exact path="/login" component={LoginApp}/>
                        <Route path="/" render={(props) => {
                            if (isLogin) {
                                return (
                                    <App>
                                        <Switch>
                                            <Route path="/boru" render={(p) =>
                                                <Boru>
                                                    <Switch>
                                                        <Route exact path="/boru/insert-record"
                                                               component={InsertRecordApp}/>
                                                        <Route exact path="/boru/insert-person"
                                                               component={InsertPersonApp}/>
                                                        <Route exact path="/boru/query-record"
                                                               component={QueryRecordApp}/>
                                                        <Route exact path="/boru/query-person"
                                                               component={QueryPersonApp}/>
                                                        <Route exact path="/boru/query-person-his"
                                                               component={QueryPersonHisApp}/>
                                                        <Route path="/boru" component={InsertRecordApp}/>
                                                    </Switch>
                                                </Boru>
                                            }/>
                                            <Route path="/shenji" render={() =>
                                                <Shenji>
                                                    <Switch>
                                                        <Route exact path="/shenji/insert-oa" component={InsertOAApp}/>
                                                        <Route exact path="/shenji/query-oa" component={QueryOAApp}/>
                                                        <Route exact path="/shenji/query-oa-his"
                                                               component={QueryOAHisApp}/>
                                                        <Route path="/shenji" component={InsertOAApp}/>
                                                    </Switch>
                                                </Shenji>
                                            }/>
                                            <Route path="/test" component={CounterApp}/>
                                            <Route path="/" render={() => <Boru><InsertRecordApp/></Boru>}/>
                                        </Switch>
                                    </App>
                                );
                            } else {
                                message.info("即将跳转登录界面进行登录!");
                                setTimeout(() => {

                                }, 2000);
                                return <Redirect to={{
                                    pathname: '/login',
                                    state: {
                                        from: props.location.pathname
                                    }
                                }}/>
                            }
                        }}/>
                    </Switch>
                </Route>
            </Router>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isLogin: state.loginReducer.isLogin,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const MyRouterApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyRouter)


export default MyRouterApp;