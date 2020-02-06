import React from 'react';
import {Table, Row, Col, Form, Input, Button, Select, message} from 'antd';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {FormComponentProps} from "antd/lib/form";
import {PaginationConfig} from "antd/lib/pagination";


import {getPersonsByCondition, insertRtyDialOAPersons} from './action';
import {rtyDialOAPersonRes, rtyDialOAPerson} from './data';

import {VpnConstants, StatusConstants} from '../../constants/commonConstants';
import {getAllDepartment} from "../action";


import "./index.less";

const style = {
    'insertOA': 'insert-OA',
    'nav': 'nav',
}

const FormItem = Form.Item;
const {Option} = Select;

export interface InsertOAProps extends FormComponentProps {
    getPersonsByCondition: any;
    getAllDepartment: any;
    insertRtyDialOAPersons: any;

    dataSourceResult: Array<rtyDialOAPersonRes>;
    total: number;  // 数据长度
    dataSourceLoading: boolean;
    insertLoading: boolean;
    departmentResult: Array<{ id: number, name: string }>;
}

export interface InsertOAStates {
    columns: any;
    pagination: PaginationConfig;
}


class InsertOA extends React.Component<InsertOAProps, InsertOAStates> {

    state = {
        columns: [
            {
                title: '状态',
                dataIndex: 'status',
                width: 80
            },
            {
                title: '账号名',
                dataIndex: 'countName',
                width: 150
            },
            {
                title: '账号类型',
                dataIndex: 'vpnType.description',
                width: 180
            },
            {
                title: '姓名',
                dataIndex: 'firstName',
                width: 100
            },
            {
                title: '手机',
                dataIndex: 'telecomNumber',
                width: 130
            },
            {
                title: '部门',
                dataIndex: 'department.name',
                width: 140
            },
            {
                title: '说明',
                dataIndex: 'description',
            },
            {
                title: '工单',
                dataIndex: 'billId',
                width: 150
            },
            {
                title: '修改工单',
                dataIndex: 'modifiedBillId',
                width: 150
            },
            {
                title: '创建人',
                dataIndex: 'createdBy',
                width: 80
            },
            {
                title: '修改人',
                dataIndex: 'modifiedBy',
                width: 80
            },
            {
                title: '创建时间',
                dataIndex: 'createdStamp',
                width: 200
            },
            {
                title: '修改时间',
                dataIndex: 'lastUpdatedStamp',
                width: 200
            },
            {
                title: 'Action',
                key: 'editor',
                width: 80,
                render: (text: rtyDialOAPersonRes) => {
                    return (<div className="editor" data-id={text.dialPersonId}>编辑</div>);
                },
            },
            {
                title: 'Action',
                key: 'stop',
                width: 80,
                render: (text: rtyDialOAPersonRes) => {
                    return (<div className="stop" data-id={text.dialPersonId}>停用</div>);
                },
            }
        ],
        pagination: {
            pageSize: 5,
        },
    }

    componentDidMount() {
        const {getAllDepartment} = this.props;
        this.handleTableChange();
        getAllDepartment();
    }

    componentDidUpdate(prevProps: Readonly<InsertOAProps>, prevState: Readonly<InsertOAStates>, snapshot?: any): void {
        const {insertLoading, dataSourceLoading} = prevProps;
        if (insertLoading && insertLoading != this.props.insertLoading) {
            // 更新页面
            message.info("添加成功!");
            this.props.form.resetFields();
            const {getPersonsByCondition, getAllDepartment} = this.props;
            getAllDepartment();
            getPersonsByCondition({size: 1, pageSize: 5});
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


    componentWillReceiveProps(nextProps: Readonly<InsertOAProps>, nextContext: any): void {

    }


    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 5}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        },);
        const {getPersonsByCondition} = this.props;
        const data = {size: pager.current, pageSize: pager.pageSize};
        getPersonsByCondition(data);

    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (err) {
            } else {
                const {getFieldsValue} = this.props.form;
                const formData = getFieldsValue();
                const rtyDialOAPerson: rtyDialOAPerson = {
                    firstName: formData.firstName,
                    telecomNumber: formData.telephoneNumber,
                    countName: formData.countName,
                    status: formData.status,
                    description: formData.desc,
                    departmentId: formData.department,
                    createdBy: 'root',
                    billId: formData.billId,
                    vpnTypeId: formData.vpnType,
                    opType: '新增',
                }
                const {insertRtyDialOAPersons} = this.props;
                insertRtyDialOAPersons(rtyDialOAPerson);
            }
        });
    }

    render() {
        const {dataSourceResult, dataSourceLoading, departmentResult} = this.props;
        const {getFieldDecorator} = this.props.form;
        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];
        return (
            <div className={style.insertOA}>
                <div className={style.nav}>添加</div>
                <Form style={{padding: 30}} onSubmit={this.handleSubmit}>
                    <Row gutter={24} type="flex">
                        <Col span={6}>
                            <FormItem label="姓名">
                                {getFieldDecorator('firstName', {rules: [{required: true, message: '请输入姓名'}]})(
                                    <Input placeholder="请输入姓名"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="电话号码">
                                {getFieldDecorator('telephoneNumber', {rules: [{required: true, message: '请输入电话号码'}]})(
                                    <Input placeholder="请输入电话号码"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="vpn账号名">
                                {getFieldDecorator('countName', {rules: [{required: true, message: '请输入vpn账号名'}]})(
                                    <Input placeholder="请输入vpn账号名"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="工单号">
                                {getFieldDecorator('billId', {rules: [{required: true, message: '请输入工单号'}]})(
                                    <Input placeholder="请输入工单号"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24} type="flex">
                        <Col span={6}>
                            <FormItem label="说明">
                                {getFieldDecorator('desc', {rules: [{required: true, message: '请输入说明'}]})(
                                    <Input placeholder="请输入说明"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="所属部门">
                                {getFieldDecorator('department', {rules: [{required: true, message: '请输入部门'}]})(
                                    <Select placeholder="请输入部门" style={{width: '100%', height: 30}}>
                                        {departmentOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="vpn账号类型">
                                {getFieldDecorator('vpnType', {rules: [{required: true, message: '请选择vpn账号类型'}]})(
                                    <Select placeholder="请选择vpn账号类型" style={{width: '100%', height: 30}}>
                                        <Option value={VpnConstants.VPN_TYPE_00}>公网-BOSS接入层</Option>
                                        <Option value={VpnConstants.VPN_TYPE_01}>公网-BOSS访问层</Option>
                                        <Option value={VpnConstants.VPN_TYPE_02}>OA-BOSS接入层</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="是否可用">
                                {getFieldDecorator('status', {rules: [{required: true, message: '请选择状态'}]})(
                                    <Select placeholder="请选择状态" style={{width: '50%', height: 30}}>
                                        <Option value={StatusConstants.STATUS_Y}>是</Option>
                                        <Option value={StatusConstants.STATUS_N}>否</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24} type="flex" style={{paddingLeft: '30%'}}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 100}}>
                                添加
                            </Button>
                        </FormItem>
                    </Row>
                </Form>
                {/*分页展示*/}
                <div className="nav-list">拨入人员列表</div>
                <div className="page-nick">
                    <Table bordered
                           columns={this.state.columns} dataSource={dataSourceResult}
                           pagination={this.state.pagination} scroll={{x: 2200}} loading={dataSourceLoading}
                           onChange={this.handleTableChange}/>
                </div>

            </div>
        );
    }
}

const InsertOAForm = Form.create<InsertOAProps>()(InsertOA);

const mapStateToProps = (state: any) => ({
    dataSourceResult: state.shenjiReducer.dataSourceResult,
    dataSourceLoading: state.shenjiReducer.dataSourceLoading,
    insertLoading: state.shenjiReducer.insertLoading,
    departmentResult: state.commonReducer.departmentResult,
    total: state.shenjiReducer.total,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getPersonsByCondition: bindActionCreators(getPersonsByCondition, dispatch),
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    insertRtyDialOAPersons: bindActionCreators(insertRtyDialOAPersons, dispatch),
})

const InsertOAApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(InsertOAForm)


export default InsertOAApp;
