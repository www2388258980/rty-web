import React from 'react';
import {bindActionCreators, Dispatch} from "redux";
import {connect} from 'react-redux';

import {
    Form, Input, Button, DatePicker, Select, Row, Col, message, Table
} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {PaginationConfig} from "antd/lib/pagination";

import './index.less';
import {StatusConstants} from '../../constants/commonConstants';
import {getAllDepartment} from '../action';
import {insertPerson, getDialPerson} from './action';
import {rtyDialPerson} from "./data";

const style = {
    insertPerson: 'insert-person',
    nav: 'nav',
    formItem: 'form-item',
    pageNick: 'page-nick',
};

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {Option} = Select;

export interface InsertRecordProps extends FormComponentProps {
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    insertPerson: any;
    insertPersonLoading: boolean;
    getDialPerson: any;
    dataSourceResult: Array<rtyDialPerson>;
    dataSourceLoading: boolean;
    total: number;
}

export interface InsertRecordStates {
    columns: any;
    pagination: PaginationConfig;
}

class InsertPerson extends React.Component<InsertRecordProps, InsertRecordStates> {

    state = {
        columns: [
            {
                title: '状态',
                dataIndex: 'status',
                width: 80,
            },
            {
                title: '名字',
                dataIndex: 'firstName',
                width: 120,
            },
            {
                title: '电话号码',
                dataIndex: 'telecomNumber',
                width: 150,
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '部门',
                dataIndex: 'firstName',
                width: 200,
            },
            {
                title: '创建工单',
                dataIndex: 'billId',
                width: 150,
            },
            {
                title: '修改工单',
                dataIndex: 'modifiedBillId',
                width: 150,
            },
            {
                title: '创建人',
                dataIndex: 'createdBy',
                width: 120,
            },
            {
                title: '修改人',
                dataIndex: 'modifiedBy',
                width: 120,
            },
            {
                title: '创建时间',
                dataIndex: 'createdStamp',
                width: 200,
            },
            {
                title: '有限期限',
                dataIndex: 'effectiveDate',
                width: 200,
            },
            {
                title: 'Action',
                key: 'tingyong',
                fixed: 'right' as 'right',
                width: 80,
                render: (text: rtyDialPerson) => {
                    return (<div className="stop-using" data-id={text.dialPersonId}>停用</div>);
                },
            },
            {

                title: 'Action',
                key: 'stop',
                fixed: 'right' as 'right',
                width: 80,
                render: (text: rtyDialPerson) => {
                    return (<div className="start-using" data-id={text.dialPersonId}>启用</div>);
                },
            }
        ],
        pagination: {
            pageSize: 5,
        },
    }


    componentDidMount() {
        const {getAllDepartment, getDialPerson} = this.props;
        getAllDepartment();
        getDialPerson({size: 1, pageSize: 5});
    }

    componentDidUpdate(prevProps: Readonly<InsertRecordProps>, prevState: Readonly<InsertRecordStates>, snapshot?: any): void {
        const {insertPersonLoading,dataSourceLoading} = prevProps;
        if (insertPersonLoading && insertPersonLoading != this.props.insertPersonLoading) {
            // 更新页面
            message.info("添加成功!");
            this.props.form.resetFields();
            const {getAllDepartment,getDialPerson} = this.props;
            getAllDepartment();
            getDialPerson({size: 1, pageSize: 5});
        }
        if (dataSourceLoading && dataSourceLoading != this.props.dataSourceLoading) {
            // 当获取数据成功以后设置total
            const pager: PaginationConfig = {...this.state.pagination};
            pager.total = this.props.total;
            this.setState({
                pagination: pager,
            })
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        const {form, insertPerson} = this.props;
        form.validateFields((err) => {
            if (err) {
            } else {
                const {getFieldsValue} = form;
                const formData = getFieldsValue();
                const rtyDialPerson: rtyDialPerson = {
                    firstName: formData.firstName,
                    telecomNumber: formData.telephoneNumber,
                    description: formData.description,
                    departmentId: formData.department,
                    status: formData.status,
                    createdBy: 'root',
                    billId: formData.billId,
                    opType: '新增',
                    effectiveDate: formData.effectDate,
                };
                insertPerson(rtyDialPerson);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {departmentResult, dataSourceResult, dataSourceLoading,} = this.props;
        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];
        return (
            <div className={style.insertPerson}>
                <div className={style.nav}>添加</div>
                <Form style={{paddingLeft: 10, }} onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem label="名字">
                                {getFieldDecorator('firstName', {rules: [{required: true, message: "请输入名字"}]})(
                                    <Input placeholder='请输入名字' style={{width: '50%'}}/>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="手机号码">
                                {getFieldDecorator('telephoneNumber', {rules: [{required: true, message: "请输入手机号码"}]})(
                                    <Input placeholder='请输入手机号码' style={{width: '80%'}}/>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="状态">
                                {getFieldDecorator('status', {rules: [{required: true, message: "请选择状态"}]})(
                                    <Select placeholder='请选择状态' style={{width: '40%'}}>
                                        <Option value={StatusConstants.STATUS_Y}>是</Option>
                                        <Option value={StatusConstants.STATUS_N}>否</Option>
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24} type="flex">
                        <Col span={8}>
                            <FormItem label="工单号">
                                {getFieldDecorator('billId', {rules: [{required: true, message: "请输入工单号"}]})(
                                    <Input placeholder='请输入工单号'/>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="所属部门">
                                {getFieldDecorator('department', {rules: [{required: true, message: "请选择所属部门"}]})(
                                    <Select placeholder='请选择所属部门' style={{width: '80%'}}>
                                        {departmentOptions}
                                    </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="有效期限">
                                {getFieldDecorator('effectDate', {})(
                                    <DatePicker placeholder='请选择有效期限' format="YYYY-MM-DD HH:mm" showTime/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24} type="flex">
                        <Col span={12}>
                            <FormItem label="说明">
                                {getFieldDecorator('description', {rules: [{required: true, message: "请填写说明原因"}]})(
                                    <TextArea rows={2} placeholder='请填写说明原因' style={{resize: 'none',}}/>)}
                            </FormItem>
                        </Col>
                        <Col span={8} style={{padding: '5%'}}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Col>
                    </Row>
                </Form>
                <div className="page-nick">
                    <div className={style.nav}>数据展示</div>
                    <Table bordered
                           columns={this.state.columns} dataSource={dataSourceResult}
                           pagination={this.state.pagination} scroll={{x: 2200}} loading={dataSourceLoading}
                    />
                </div>
            </div>
        );
    }
}

const InsertPersonForm = Form.create({name: 'InsertRecord'})(InsertPerson);

const mapStateToProps = (state: any) => ({
    departmentResult: state.commonReducer.departmentResult,
    insertPersonLoading: state.boruReducer.insertPersonLoading,
    dataSourceResult: state.boruReducer.dataSourceResult,
    dataSourceLoading: state.boruReducer.dataSourceLoading,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    insertPerson: bindActionCreators(insertPerson, dispatch),
    getDialPerson: bindActionCreators(getDialPerson, dispatch),
})


const InsertPersonApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(InsertPersonForm)

export default InsertPersonApp;