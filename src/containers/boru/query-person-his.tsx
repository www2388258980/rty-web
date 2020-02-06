import React from 'react';

import {connect} from 'react-redux';

import {Input, Select, Form, Row, Col, DatePicker, Button} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {StatusConstants} from "../../constants/commonConstants";
import {Dispatch} from "redux";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryPersonHisProps extends FormComponentProps {

}

export interface queryPersonHisStates {

}

class QueryPersonHis extends React.Component<queryPersonHisProps, queryPersonHisStates> {

    state = {}

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="query-oa-his">
                <div className="nav">查询条件</div>
                <Form style={{paddingLeft: 50}}>
                    <Row gutter={18}>
                        <Col span={6}>
                            <FormItem label="姓名">
                                {getFieldDecorator("firstName", {})(
                                    <Input placeholder="输入姓名或者拼音" style={{width: '60%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="部门">
                                {getFieldDecorator("department", {})(
                                    <Select placeholder="选择部门" style={{width: '80%'}}>

                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="状态">
                                {getFieldDecorator("status", {})(
                                    <Select placeholder="是否可用" style={{width: '50%'}}>
                                        <Option value={StatusConstants.STATUS_Y}>是</Option>
                                        <Option value={StatusConstants.STATUS_N}>否</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem label="时间>=">
                                <DatePicker placeholder="选择时间"/>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="时间>=">
                                <DatePicker placeholder="选择时间"/>
                            </FormItem>
                        </Col>
                        <Col span={6} style={{paddingTop: 45,paddingLeft: 10}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 100}}>
                                搜索
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        );
    }
}

const QueryPersonHisForm = Form.create<queryPersonHisProps>()(QueryPersonHis);

const mapStateTopProps = (state: any) => {

}
const mapDispatchToProps = (dispatch: Dispatch) => {

}

const QueryPersonHisApp = connect(
    mapStateTopProps,
    mapDispatchToProps,
)(QueryPersonHisForm);

export default QueryPersonHisApp;