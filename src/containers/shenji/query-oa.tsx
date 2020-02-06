import React from 'react';

import {connect} from 'react-redux';

import {Form, Select, Row, Col, Button} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Dispatch} from "redux";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryOAProps extends FormComponentProps {

}

export interface queryOAStates {

}

class QueryOA extends React.Component<queryOAProps, queryOAStates> {
    state = {}

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="query-oa">
                <div className="nav">查询条件</div>
                <Row>
                    <Col span={6}>
                        <FormItem label="姓名">
                            {getFieldDecorator("firstName", {})(
                                <Select showSearch
                                        style={{width: '60%'}}
                                        placeholder="输入姓名">

                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="选择部门">
                            {getFieldDecorator("department", {})(
                                <Select style={{width: '100%'}}
                                        placeholder="选择部门">

                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} style={{paddingLeft: 20, paddingTop: 44}}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 80}}>
                            搜索
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const QueryOAForm = Form.create({name: 'QueryOA'})(QueryOA);

const mapStatesToProps = (state: any) => {

}
const mapDispatchToProps = (dispatch: Dispatch) => {

}

const QueryOAApp = connect(
    mapStatesToProps,
    mapDispatchToProps,
)(QueryOAForm);

export default QueryOAApp;

