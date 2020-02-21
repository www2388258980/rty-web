import React, {FormEvent} from 'react';

import {Form, Input, Icon, Checkbox, Button, message} from 'antd';
import {FormComponentProps} from "antd/lib/form";

import './index.less';
import {bindActionCreators, Dispatch} from "redux";

import {connect} from "react-redux";
import {LoginBean} from "./data";
import {loginFunc} from './action';


export interface LoginProps extends FormComponentProps {
    loginFunc: any;
    loginResult: LoginBean;
    loginLoading: boolean;
    status: string;
    isLogin: boolean;
    location: any;
    history: any;
}

export interface LoginStates {

}

class Login extends React.Component<LoginProps, LoginStates> {
    state = {}

    componentWillReceiveProps(nextProps: Readonly<LoginProps>, nextContext: any): void {
        const {status, loginLoading} = nextProps;
        console.log("loginLoading:" + loginLoading);
        console.log("status:" + status);

        if (loginLoading == false && loginLoading != this.props.loginLoading) {
            if (status == 'success') {
                const {location} = this.props;
                const from = location.state && location.state.from;
                this.props.history.push({
                    pathname: from ? from : '/',
                    state: {
                        // article
                    }
                })
            } else {
                message.error("账号or密码错误!");
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<LoginProps>, prevState: Readonly<LoginStates>, snapshot?: any): void {

    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {form, loginFunc} = this.props;
        form.validateFields((err) => {
            if (!err) {
                const {getFieldsValue} = form;
                const formData = getFieldsValue();
                const login: LoginBean = {
                    id: formData.username,
                    password: formData.password,
                }
                loginFunc(login);

            }
        });
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string |
        number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit} className="login-form"
                      style={{padding: 10, width: 400, marginLeft: '40%', marginTop: '10%'}}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <span className="login-form-forgot"
                              style={{marginLeft: 150, color: '#1890ff', cursor: "pointer"}}>
                            Forgot password
                        </span>
                        <div>
                            <Button type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{width: 200, marginLeft: 100}}>
                                Log in
                            </Button>
                        </div>
                        Or <span style={{color: '#1890ff', cursor: "pointer"}}>register now!</span>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create<LoginProps>()(Login);

const mapStateToProps = (state: any) => ({
    loginResult: state.loginReducer.loginResult,
    loginLoading: state.loginReducer.loginLoading,
    status: state.loginReducer.status,
    isLogin: state.loginReducer.isLogin,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loginFunc: bindActionCreators(loginFunc, dispatch),
})

const LoginApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)


export default LoginApp;
