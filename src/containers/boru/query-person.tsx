import React from 'react';

import {connect} from 'react-redux';

import {Form, Select, Row, Col, Button} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {Dispatch} from "redux";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryPersonsProps extends FormComponentProps {

}

export interface queryPersonsStates {

}

class QueryPerson extends React.Component<queryPersonsProps, queryPersonsStates> {
    state = {}

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <div className="nav">查询条件</div>
                <Row>
                    <Col span={8}>
                        <FormItem label="拨入人">
                            {getFieldDecorator("firstName", {})(
                                <Select placeholder="输入拨入人名字"
                                        style={{width: '40%'}}
                                        showSearch>
                                    <Option value="1">喜洋洋</Option>
                                    <Option value="2">懒羊羊</Option>
                                    <Option value="3">沸羊羊</Option>
                                    <Option value="4">美羊羊</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="部门">
                            {getFieldDecorator("department", {})(
                                <Select placeholder="选择部门"
                                        style={{width: '80%'}}
                                        showSearch>

                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} style={{paddingLeft: 10,paddingTop: 42}}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 100}}>
                            搜索
                        </Button>
                    </Col>
                </Row>
                <div>

                </div>
            </div>
        );
    }
}

const QueryPersonForm = Form.create({name: 'QueryPerson'})(QueryPerson);

const mapStateToProps = (State: any) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const QueryPersonApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(QueryPersonForm);

export default QueryPersonApp;