import React, {FormEvent} from 'react';

import {connect} from 'react-redux';

import {Select, Form, Row, Col, DatePicker, Button, Table} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {StatusConstants} from "../../constants/commonConstants";
import {bindActionCreators, Dispatch} from "redux";
import {PaginationConfig} from "antd/lib/pagination";
import {rtyDialOAPerson, rtyDialOAPersonHisReq, rtyDialOAPersonExtend, rtyDialOAPersonHisExtend} from "./data";
import {getAllDepartment} from "../action";
import {getRtyOADialPersonsByFirstChar, getOADialPersonsHis} from "./action";
import {rtyDialPersonHis} from "../boru/data";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryOAHisProps extends FormComponentProps {
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    getRtyOADialPersonsByFirstChar: any;
    rtyOADialPersonsByFirstCharSourceResult: rtyDialOAPerson[];
    getOADialPersonsHis: any;
    rtyOAPersonsHisResult: rtyDialOAPersonHisExtend[];
    rtyOAPersonsHisLoading: boolean;
    rtyOAPersonsHisTotal: number;
}

export interface queryOAHisStates {
    columns: any;
    pagination: PaginationConfig;
    exeSql: boolean;
    // 保存查询条件
    rtyOADialPersonHis: rtyDialPersonHis;
    startDate: string;
    endDate: string;
}

class QueryOAHis extends React.Component<queryOAHisProps, queryOAHisStates> {

    state = {
        columns: [
            {
                title: '操作类型',
                dataIndex: 'opType',
                width: 100
            },

            {
                title: '状态',
                dataIndex: 'status',
                width: 80
            },
            {
                title: 'rtyOA账号类型',
                dataIndex: 'vpnType.description',
                width: 150
            },
            {
                title: '账号名',
                dataIndex: 'countName',
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
                title: '修改人',
                dataIndex: 'modifiedByUser.name',
                width: 80
            },
            {
                title: '操作时间',
                dataIndex: 'createdStamp',
                width: 200,
                fixed: 'right' as 'right',
            },
        ],
        pagination: {
            pageSize: 10,
        },
        exeSql: false,
        rtyOADialPersonHis: {},
        startDate: '',
        endDate: '',
    }

    componentDidMount(): void {
        const {getAllDepartment, getRtyOADialPersonsByFirstChar} = this.props;
        getAllDepartment();
        getRtyOADialPersonsByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<queryOAHisProps>, prevState: Readonly<queryOAHisStates>, snapshot?: any): void {
        const {rtyOAPersonsHisLoading} = prevProps;
        if (rtyOAPersonsHisLoading && rtyOAPersonsHisLoading != this.props.rtyOAPersonsHisLoading) {
            // 当获取数据成功以后设置total
            const pager: PaginationConfig = {...this.state.pagination};
            pager.total = this.props.rtyOAPersonsHisTotal;
            this.setState({
                pagination: pager,
            })
        }
    }

    handleSearch = (value: string) => {
        const {getRtyOADialPersonsByFirstChar} = this.props;
        getRtyOADialPersonsByFirstChar(value);

    }

    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 10}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const {getOADialPersonsHis} = this.props;
        const {rtyOADialPersonHis, startDate, endDate} = this.state;
        const data = {
            // @ts-ignore
            firstName: rtyOADialPersonHis.firstName,
            // @ts-ignore
            departmentId: rtyOADialPersonHis.department,
            // @ts-ignore
            status: rtyOADialPersonHis.status,
            size: pager.current,
            pageSize: pager.pageSize
        };
        getOADialPersonsHis(data, startDate, endDate);
    }

    goBack = () => {
        this.setState({
            exeSql: false
        })
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {form, getOADialPersonsHis} = this.props;
        form.validateFields(err => {
            if (err) {
            } else {
                const {getFieldsValue} = form;
                const formData = getFieldsValue();
                const rtyDialOAPersonHisReq: rtyDialOAPersonHisReq = {
                    firstName: formData.firstName,
                    departmentId: formData.department,
                    status: formData.status,
                    size: 1,
                    pageSize: 10,
                };
                // 小于等于
                const startDate = formData.startDate ? formData.startDate - 24 * 60 * 60 * 1000 : '';
                getOADialPersonsHis(rtyDialOAPersonHisReq, startDate, formData.endDate);
                this.setState({
                    exeSql: true,
                    rtyOADialPersonHis: {
                        firstName: formData.firstName,
                        departmentId: formData.department,
                        status: formData.status,
                    },
                    startDate: String(startDate),
                    endDate: formData.endDate
                })
            }
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        const {departmentResult, rtyOADialPersonsByFirstCharSourceResult, rtyOAPersonsHisResult, rtyOAPersonsHisLoading} = this.props;

        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];

        const rtyOADialPersons = rtyOADialPersonsByFirstCharSourceResult ?
            rtyOADialPersonsByFirstCharSourceResult.map((item: rtyDialOAPerson) =>
                <Option key={item.dialPersonId} value={item.firstName}>{item.firstName}</Option>,
            ) : [];

        const {exeSql} = this.state;
        return (
            <div className="query-oa-his">
                {exeSql == false ?
                    <div>
                        <div className="nav">查询条件</div>
                        <Form style={{paddingLeft: 50}} onSubmit={this.handleSubmit}>
                            <Row gutter={18}>
                                <Col span={6}>
                                    <FormItem label="姓名">
                                        {getFieldDecorator("firstName", {})(
                                            <Select showSearch
                                                    style={{width: '60%'}}
                                                    placeholder="输入姓名"
                                                    defaultActiveFirstOption={false}
                                                    showArrow={false}
                                                    filterOption={false}
                                                    notFoundContent={null}
                                                    onSearch={this.handleSearch}>
                                                {rtyOADialPersons}
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
                                        {getFieldDecorator('startDate', {})(
                                            <DatePicker placeholder="选择时间"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label="时间<=">
                                        {getFieldDecorator('endDate', {})(
                                            <DatePicker placeholder="选择时间"/>
                                        )}
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
                               dataSource={rtyOAPersonsHisResult}
                               loading={rtyOAPersonsHisLoading}
                               pagination={this.state.pagination} scroll={{x: 1800}}
                               onChange={this.handleTableChange}/>
                    </div>}


            </div>
        );
    }
}

const QueryOAHisForm = Form.create<queryOAHisProps>()(QueryOAHis);

const mapStateTopProps = (state: any) => ({
    departmentResult: state.commonReducer.departmentResult,
    rtyOADialPersonsByFirstCharSourceResult: state.shenjiReducer.rtyOADialPersonsByFirstCharSourceResult,
    rtyOAPersonsHisResult: state.shenjiReducer.rtyOAPersonsHisResult,
    rtyOAPersonsHisLoading: state.shenjiReducer.rtyOAPersonsHisLoading,
    rtyOAPersonsHisTotal: state.shenjiReducer.rtyOAPersonsHisTotal,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    getRtyOADialPersonsByFirstChar: bindActionCreators(getRtyOADialPersonsByFirstChar, dispatch),
    getOADialPersonsHis: bindActionCreators(getOADialPersonsHis, dispatch),
})

const QueryOAHisApp = connect(
    mapStateTopProps,
    mapDispatchToProps,
)(QueryOAHisForm);

export default QueryOAHisApp;