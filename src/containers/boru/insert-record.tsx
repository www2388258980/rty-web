import React from 'react';
import {Dispatch} from "redux";
import {connect} from 'react-redux';

import {
    Form, Input, Button, DatePicker, Select
} from 'antd';
import {FormComponentProps} from 'antd/es/form';



export interface InsertRecordProps extends FormComponentProps {
}

export interface InsertRecordStates {
    showInfoFlag: boolean;
}

class InsertRecord extends React.Component<InsertRecordProps, InsertRecordStates> {

    state = {
        showInfoFlag: false,
    }


    componentDidMount() {
        // 填充拨入人员
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 10},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 10},
            },
        };
        const {showInfoFlag} = this.state;

        return (
            <div className="insert-record">
                <div className="nav-tab">编辑</div>
                <Form {...formItemLayout} >
                    <Form.Item label="拨入人员" wrapperCol={{xs: {span: 2}, sm: {span: 3}}}>
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: '请输入姓名!',},],
                        })(
                            <Select placeholder="请选择拨入人员">

                            </Select>
                        )}
                        {showInfoFlag ?
                            <div>
                                <span style={{display: "block"}}>部门: 羊村</span>
                                <span style={{display: "block"}}>电话号码: 12312341234</span>
                            </div> : ''
                        }

                    </Form.Item>
                    <Form.Item label="拨入日期">
                        {getFieldDecorator('dialDate', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入日期!',
                                },
                            ],
                        })(<DatePicker showTime placeholder="选择时间"/>)}
                    </Form.Item>
                    <Form.Item label="拨入原因">
                        {getFieldDecorator('dialCause', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入原因!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="备注">
                        {getFieldDecorator('desc', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入备注!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <div style={{marginLeft: '25%',}}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const InsertRecordForm = Form.create({name: 'InsertRecord'})(InsertRecord);

const mapStateToProps = (state: any) => ({
})
const mapDispatchToProps = (dispatch: Dispatch) => {

}

const InsertRecordApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InsertRecordForm)

export default InsertRecordApp;