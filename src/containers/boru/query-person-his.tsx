import React, {FormEvent} from 'react';

import {connect} from 'react-redux';

import {Select, Form, Row, Col, DatePicker, Button, Table} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {StatusConstants} from "../../constants/commonConstants";
import {bindActionCreators, Dispatch} from "redux";
import {PaginationConfig} from "antd/lib/pagination";
import {rtyDialPerson, rtyDialPersonHis, rtyDialPersonHisExtend, rtyDialPersonHisReq, rtyDialPersonReq} from "./data";
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
    rtyDialPersonsHisSourceResult: rtyDialPersonHisExtend[];
    rtyDialPersonsHisSourceLoading: boolean;
    rtyDialPersonsHisSourceTotal: number;
}

export interface queryPersonHisStates {
    columns: any;
    pagination: PaginationConfig;
    exeSql: boolean;
    rtyDialPersonHis: rtyDialPersonHisExtend; // 记录查询条件
    startDate: string;
    endDate: string;
}

class QueryPersonHis extends React.Component<queryPersonHisProps, queryPersonHisStates> {

    state = {
        columns: [
            {
                title: '操作类型',
                dataIndex: 'opType',
                width: 120,
                fixed: 'left' as 'left',
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 80,
            },
            {
                title: '名字',
                dataIndex: 'firstName',
                width: 100,
            },
            {
                title: '电话号码',
                dataIndex: 'telecomNumber',
                width: 130,
            },
            {
                title: '部门',
                dataIndex: 'department.name',
                width: 200,
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '工单',
                dataIndex: 'billId',
                width: 200,
            },
            {
                title: '修改人',
                dataIndex: 'modifiedByUser.name',
                width: 100,
            },
            {
                title: '操作时间',
                dataIndex: 'createdStamp',
                width: 180,
                fixed: 'right' as 'right',
            },
        ],
        pagination: {
            pageSize: 10,
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
                    departmentId: formData.department,
                    status: formData.status,
                    size: 1,
                    pageSize: 10,
                };
                const {getDialPersonHis} = this.props;
                // 小于等于
                const startDate = formData.startDate ? formData.startDate - 24 * 60 * 60 * 1000 : '';
                getDialPersonHis(rtyDialPersonHisReq, startDate, formData.endDate);
                this.setState({
                    exeSql: true,
                    rtyDialPersonHis: {
                        firstName: formData.firstName,
                        departmentId: formData.department,
                        status: formData.status,
                    },
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                })
            }
        })
    }

    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 10}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const {rtyDialPersonHis, startDate, endDate} = this.state;
        const rtyDialPersonHisReq: rtyDialPersonHisReq = {
            //@ts-ignore
            firstName: rtyDialPersonHis.firstName,
            //@ts-ignore
            departmentId: rtyDialPersonHis.department && rtyDialPersonHis.department.id,
            //@ts-ignore
            status: rtyDialPersonHis.status,
            size: Number(pagination.current),
            pageSize: Number(pagination.pageSize),
        }
        const {getDialPersonHis} = this.props;
        getDialPersonHis(rtyDialPersonHisReq, startDate, endDate);
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
                <Option key={item.dialPersonId} value={item.firstName}>{item.firstName}</Option>,
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
                            <Row gutter={18}>
                                <Col span={6}>
                                    <FormItem label="时间>=">
                                        {getFieldDecorator("startDate", {})(
                                            <DatePicker placeholder="选择时间"/>)}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label="时间<=">
                                        {getFieldDecorator("endDate", {})(
                                            <DatePicker placeholder="选择时间"/>)}
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
                               scroll={{x: 1600}}
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