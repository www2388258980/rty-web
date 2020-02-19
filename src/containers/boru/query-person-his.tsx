import React, {FormEvent} from 'react';

import {connect} from 'react-redux';

import {Select, Form, Row, Col, DatePicker, Button, Table} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {StatusConstants} from "../../constants/commonConstants";
import {bindActionCreators, Dispatch} from "redux";
import {PaginationConfig} from "antd/lib/pagination";
import {rtyDialPerson, rtyDialPersonHis, rtyDialPersonHisReq, rtyDialPersonReq} from "./data";
import {getDialPersonHis, getDialPersonByFirstChar} from './action';
import {getAllDepartment} from "../action";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryPersonHisProps extends FormComponentProps {
    getDialPersonByFirstChar: any;
    rtyDialPersonsByFirstCharResult: Array<rtyDialPerson>;
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    getDialPersonHis: any;
    rtyDialPersonsHisSourceResult: rtyDialPersonHis[];
    rtyDialPersonsHisSourceLoading: boolean;
    rtyDialPersonsHisSourceTotal: number;
}

export interface queryPersonHisStates {
    columns: any;
    pagination: PaginationConfig;
    exeSql: boolean;
    rtyDialPersonHis: rtyDialPersonHis; // 记录查询条件
    startDate: string;
    endDate: string;
}

class QueryPersonHis extends React.Component<queryPersonHisProps, queryPersonHisStates> {

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
        exeSql: false,
        rtyDialPersonHis: {},
        startDate: '',
        endDate: '',
    }

    componentDidMount(): void {
        const {getDialPersonByFirstChar, getAllDepartment} = this.props;
        getAllDepartment();
        getDialPersonByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<queryPersonHisProps>, prevState: Readonly<queryPersonHisStates>, snapshot?: any): void {
        const {rtyDialPersonsHisSourceLoading} = prevProps;
        if (rtyDialPersonsHisSourceLoading && rtyDialPersonsHisSourceLoading != this.props.rtyDialPersonsHisSourceLoading) {
            // 当获取数据成功以后设置total
            const pager: PaginationConfig = {...this.state.pagination};
            pager.total = this.props.rtyDialPersonsHisSourceTotal;
            this.setState({
                pagination: pager,
            })
        }
    }

    goBack = () => {
        this.setState({
            exeSql: false
        })
    }

    handleSearch = (value: string) => {
        if (value) {
            const {getDialPersonByFirstChar} = this.props;
            getDialPersonByFirstChar(value);
        }
    }

    handleTableSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields(err => {
            if (err) {
            } else {
                const {getFieldsValue} = this.props.form;
                const formData = getFieldsValue();
                const rtyDialPersonHisReq: rtyDialPersonHisReq = {
                    firstName: formData.firstName,
                    departmentId: formData.departmentId,
                    size: 1,
                    pageSize: 5,
                };
                const {getDialPersonHis} = this.props;
                getDialPersonHis(rtyDialPersonHisReq, formData.startDate, formData.endDate);
                this.setState({
                    exeSql: true,
                    rtyDialPersonHis: {
                        firstName: formData.firstName,
                        departmentId: formData.departmentId,
                    },
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                })
            }
        })
    }

    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 5}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const {rtyDialPersonHis,startDate,endDate} = this.state;
        const rtyDialPersonHisReq: rtyDialPersonHisReq = {
            //@ts-ignore
            firstName: rtyDialPersonHis.firstName,
            //@ts-ignore
            departmentId: rtyDialPersonHis.department,
            size: Number(pagination.current),
            pageSize: Number(pagination.pageSize),
        }
        const {getDialPersonHis} = this.props;
        getDialPersonHis(rtyDialPersonHisReq,startDate,endDate);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        const {
            rtyDialPersonsHisSourceLoading, rtyDialPersonsHisSourceResult, rtyDialPersonsByFirstCharResult,
            departmentResult
        } = this.props;

        // 填充拨入人员
        const rtyDialPersons = rtyDialPersonsByFirstCharResult ?
            rtyDialPersonsByFirstCharResult.map((item: rtyDialPerson) =>
                <Option key={item.dialPersonId} value={item.dialPersonId}>{item.firstName}</Option>,
            ) : [];

        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];
        return (
            <div className="query-oa-his">
                {this.state.exeSql == false ? <div>
                        <div className="nav">查询条件</div>
                        <Form style={{paddingLeft: 50}} onSubmit={this.handleTableSubmit}>
                            <Row gutter={18}>
                                <Col span={6}>
                                    <FormItem label="姓名">
                                        {getFieldDecorator("firstName", {})(
                                            <Select placeholder="输入拨入人名字"
                                                    style={{width: '50%'}}
                                                    defaultActiveFirstOption={false}
                                                    showArrow={false}
                                                    filterOption={false}
                                                    notFoundContent={null}
                                                    showSearch
                                                    onSearch={this.handleSearch}>
                                                {rtyDialPersons}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label="部门">
                                        {getFieldDecorator("department", {})(
                                            <Select placeholder="选择部门"
                                                    style={{width: '80%'}}
                                                    showSearch>
                                                {departmentOptions}
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
                                <Col span={6} style={{paddingTop: 45, paddingLeft: 10}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{width: 100}}>
                                        搜索
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div> :
                    <div>
                        <div className="nav" onClick={this.goBack} style={{cursor: 'pointer'}}>返回</div>
                        <Table bordered
                               columns={this.state.columns}
                               dataSource={rtyDialPersonsHisSourceResult}
                               loading={rtyDialPersonsHisSourceLoading}
                               pagination={this.state.pagination}
                               scroll={{x: 2200}}
                               onChange={this.handleTableChange}/>
                    </div>}


            </div>
        );
    }
}

const QueryPersonHisForm = Form.create<queryPersonHisProps>()(QueryPersonHis);

const mapStateTopProps = (state: any) => ({
    rtyDialPersonsByFirstCharResult: state.boruReducer.rtyDialPersonsByFirstCharResult,
    departmentResult: state.commonReducer.departmentResult,
    rtyDialPersonsHisSourceResult: state.boruReducer.rtyDialPersonsHisSourceResult,
    rtyDialPersonsHisSourceLoading: state.boruReducer.rtyDialPersonsHisSourceLoading,
    rtyDialPersonsHisSourceTotal: state.boruReducer.rtyDialPersonsHisSourceTotal,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDialPersonByFirstChar: bindActionCreators(getDialPersonByFirstChar, dispatch),
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    getDialPersonHis: bindActionCreators(getDialPersonHis, dispatch),

})

const QueryPersonHisApp = connect(
    mapStateTopProps,
    mapDispatchToProps,
)(QueryPersonHisForm);

export default QueryPersonHisApp;