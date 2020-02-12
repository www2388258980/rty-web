import React from 'react';
import {bindActionCreators, Dispatch} from "redux";
import {connect} from 'react-redux';

import {
    Form, Input, Button, DatePicker, Select, message
} from 'antd';
import {FormComponentProps} from 'antd/es/form';

const {Option} = Select;

import {getDialPersonByFirstChar, insertDialRecord} from './action';
import {rtyDialPerson, rtyDialRecord} from './data';


export interface InsertRecordProps extends FormComponentProps {
    getDialPersonByFirstChar: any;
    rtyDialPersonsByFirstCharResult: Array<rtyDialPerson>;
    insertDialRecord: any;
    insertDialRecordLoading: boolean;
}

export interface InsertRecordStates {
    showInfoFlag: boolean;
    rtyDialPerson: rtyDialPerson | undefined;// 保存被选中的人全部信息

}

class InsertRecord extends React.Component<InsertRecordProps, InsertRecordStates> {

    state = {
        showInfoFlag: false,
        rtyDialPerson: undefined,
    }


    componentDidMount() {
        const {getDialPersonByFirstChar} = this.props;
        getDialPersonByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<InsertRecordProps>, prevState: Readonly<InsertRecordStates>, snapshot?: any): void {
        const {insertDialRecordLoading} = prevProps;
        if (insertDialRecordLoading && insertDialRecordLoading != this.props.insertDialRecordLoading) {
            message.success('提交成功!');
            this.props.form.resetFields();
        }
    }

    handleSearch = (value: string) => {
        if (value) {
            console.log("value: " + value);
            const {getDialPersonByFirstChar} = this.props;
            getDialPersonByFirstChar(value);
        }
    }

    handleChange = (value: string) => {
        const {rtyDialPersonsByFirstCharResult} = this.props;
        rtyDialPersonsByFirstCharResult.forEach((item: rtyDialPerson) => {
            if (item.dialPersonId && item.dialPersonId.toString() === value) {
                this.setState({
                    rtyDialPerson: item,
                })
            }
        })
    }


    handleSubmit = (e: any) => {
        e.preventDefault();
        const {form} = this.props;
        form.validateFields((err => {
            if (err) {

            } else {
                const {insertDialRecord} = this.props;
                const {getFieldsValue} = this.props.form;
                const {rtyDialPerson} = this.state;
                const formData = getFieldsValue();

                const rtyDialRecord: rtyDialRecord = {
                    // @ts-ignore
                    firstName: rtyDialPerson ? rtyDialPerson.firstName : '',
                    vpnDialCause: formData.dialCause,
                    description: formData.desc,
                    dialDate: formData.dialDate,
                    createdByUserLogin: 'root',
                    // @ts-ignore
                    telecomNumber: rtyDialPerson ? rtyDialPerson.telecomNumber : '',
                    // @ts-ignore
                    departmentId: rtyDialPerson ? rtyDialPerson.departmentId : 1001,
                };
                insertDialRecord(rtyDialRecord);
            }
        }))
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
        const {rtyDialPersonsByFirstCharResult} = this.props;
        // 填充拨入人员
        const rtyDialPersons = rtyDialPersonsByFirstCharResult ?
            rtyDialPersonsByFirstCharResult.map((item: rtyDialPerson) =>
                <Option key={item.dialPersonId} value={item.dialPersonId}>{item.firstName}</Option>,
            ) : [];
        return (
            <div className="insert-record">
                <div className="nav-tab">编辑</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="拨入人员" wrapperCol={{xs: {span: 2}, sm: {span: 3}}}>
                        {getFieldDecorator('firstName', {
                            rules: [{required: true, message: '请输入姓名!',},],
                        })(
                            <Select placeholder="请选择拨入人员"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    notFoundContent={null}
                                    showSearch
                                    onSearch={this.handleSearch}
                                    onChange={this.handleChange}>
                                {rtyDialPersons}
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
    rtyDialPersonsByFirstCharResult: state.boruReducer.rtyDialPersonsByFirstCharResult,
    insertDialRecordLoading: state.boruReducer.insertDialRecordLoading,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDialPersonByFirstChar: bindActionCreators(getDialPersonByFirstChar, dispatch),
    insertDialRecord: bindActionCreators(insertDialRecord, dispatch),
})

const InsertRecordApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(InsertRecordForm)

export default InsertRecordApp;