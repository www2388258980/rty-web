import React from 'react';
import {connect} from 'react-redux';

import {Form, DatePicker, Select, Row, Col, Button} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Dispatch} from "redux";

const FormItem = Form.Item;
const {Option} = Select;

export interface QueryRecordProps extends FormComponentProps {

}

export interface QueryRecordStates {

}

class QueryRecord extends React.Component<QueryRecordProps, QueryRecordStates> {
    state = {}

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="query-record">
                <div className="nav">查询条件</div>
                <Form style={{marginLeft: 50, marginTop: 10,}}>
                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="拨入人员" style={{display: 'flex'}}>
                                {getFieldDecorator('firstName', {rules: [{message: '拨入人员'}]})(
                                    <Select placeholder="请输入拨入人" style={{width: 150}}>
                                        <Option value="1">喜洋洋</Option>
                                        <Option value="2">懒羊羊</Option>
                                        <Option value="3">沸羊羊</Option>
                                        <Option value="4">美羊羊</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row> <FormItem label="开始日期" style={{display: 'flex'}}>
                        {getFieldDecorator("startDate",)(
                            <DatePicker/>
                        )}
                    </FormItem>
                    </Row>
                    <Row> <FormItem label="结束日期" style={{display: 'flex'}}>
                        {getFieldDecorator("endDate",)(
                            <DatePicker/>
                        )}
                    </FormItem>
                    </Row>
                    <Row style={{paddingLeft: 80}}>
                        <Button type="primary" htmlType="submit">查找</Button>
                    </Row>
                </Form>
                <div>



                </div>
            </div>
        );
    }
}

const QuerRecordForm = Form.create({name: "QuerRecordForm"})(QueryRecord);

const mapStateTopProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const QueryRecordApp = connect(
    mapStateTopProps,
    mapDispatchToProps,
)(QuerRecordForm);

export default QueryRecordApp;

