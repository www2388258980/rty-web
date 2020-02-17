import React, {FormEvent} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import {connect} from 'react-redux';

import {Form, DatePicker, Select, Row, Col, Button, Table} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {PaginationConfig} from "antd/lib/pagination";

import {rtyDialPerson, rtyDialRecord, rtyDialRecordReq} from "./data";
import {getDialPersonByFirstChar, getDialRecord} from "./action";


const FormItem = Form.Item;
const {Option} = Select;

export interface QueryRecordProps extends FormComponentProps {
    getDialPersonByFirstChar: any;
    rtyDialPersonsByFirstCharResult: Array<rtyDialPerson>;
    getDialRecord: any;
    rtyDialRecordResult: Array<rtyDialRecord>;
    rtyDialRecordLoading: boolean;
    rtyDialRecordTotal: number;
}

export interface QueryRecordStates {
    exeSql: boolean;
    columns: any;
    pagination: PaginationConfig;
    rtyDialRecord: rtyDialRecord; // 记录查询条件
}

class QueryRecord extends React.Component<QueryRecordProps, QueryRecordStates> {
    state = {
        exeSql: false,
        columns: [
            {title: '名字', dataIndex: 'firstName', width: 100, fixed: 'left' as 'left'},
            {title: '部门名称', dataIndex: 'department.name', width: 250, fixed: 'left' as 'left'},
            {title: '手机号码', dataIndex: 'telecomNumber', width: 150, fixed: 'left' as 'left'},
            {title: '拨入原因', dataIndex: 'vpnDialCause',},
            {title: '备注', dataIndex: 'description', width: 300},
            {title: '拨入日期', dataIndex: 'dialDate', width: 180},
            {title: '登记人', dataIndex: 'user.name', width: 100},
            {title: '创建日期', dataIndex: 'createdDate', width: 180},
            {
                title: 'Action',
                key: 'delete',
                fixed: 'right' as 'right',
                width: 100,
                render: (text: rtyDialRecord) => {
                    return <div className="delete" data-id={text.vpnDialRecordId}>删除</div>
                }
            }

        ],
        pagination: {
            pageSize: 5,
        },
        rtyDialRecord: {}
    }

    componentDidMount(): void {
        const {getDialPersonByFirstChar} = this.props;
        getDialPersonByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<QueryRecordProps>, prevState: Readonly<QueryRecordStates>, snapshot?: any): void {
        const {rtyDialRecordLoading} = prevProps;
        if (rtyDialRecordLoading && rtyDialRecordLoading != this.props.rtyDialRecordLoading) {
            // 当获取数据成功以后设置total
            const pager: PaginationConfig = {...this.state.pagination};
            pager.total = this.props.rtyDialRecordTotal;
            console.log("total: " + this.props.rtyDialRecordTotal);
            this.setState({
                pagination: pager,
            })
        }
    }

    handleSearch = (value: string) => {
        if (value) {
            const {getDialPersonByFirstChar} = this.props;
            getDialPersonByFirstChar(value);
        }
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err => {
            if (err) {

            } else {
                const {getDialRecord} = this.props;
                const {getFieldsValue} = this.props.form;
                const formData = getFieldsValue();
                const rtyDialRecordReq: rtyDialRecordReq = {
                    firstName: formData.firstName,
                    size: 1,
                    pageSize: 5,
                }
                getDialRecord(rtyDialRecordReq);
                this.setState({
                    exeSql: true
                })
            }
        }));
    }

    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 5}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const data = {size: pager.current, pageSize: pager.pageSize};
        const {getDialRecord} = this.props;
        getDialRecord(data);
    }

    goBack = () => {
        this.setState({
            exeSql: false
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        const {rtyDialPersonsByFirstCharResult, rtyDialRecordResult, rtyDialRecordLoading} = this.props;
        // 填充拨入人员
        const rtyDialPersons = rtyDialPersonsByFirstCharResult ?
            rtyDialPersonsByFirstCharResult.map((item: rtyDialPerson) =>
                <Option key={item.dialPersonId} value={item.firstName}>{item.firstName}</Option>,
            ) : [];

        const {exeSql} = this.state;
        return (
            <div className="query-record">
                {exeSql == false ?
                    <div>
                        <div className="nav">查询条件</div>
                        <Form style={{marginLeft: 50, marginTop: 10,}} onSubmit={this.handleSubmit}>
                            <Row gutter={8}>
                                <Col span={8}>
                                    <FormItem label="拨入人员" style={{display: 'flex'}}>
                                        {getFieldDecorator('firstName', {rules: [{message: '拨入人员'}]})(
                                            <Select placeholder="请输入拨入人" style={{width: 150}}
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
                    </div> :
                    <div>
                        <div className="nav" onClick={this.goBack} style={{cursor: 'pointer'}}>返回</div>
                        <Table bordered
                               columns={this.state.columns} dataSource={rtyDialRecordResult}
                               pagination={this.state.pagination} scroll={{x: 1800}}
                               loading={rtyDialRecordLoading}
                               onChange={this.handleTableChange}/>

                    </div>}


            </div>
        );
    }
}

const QuerRecordForm = Form.create({name: "QuerRecordForm"})(QueryRecord);

const mapStateTopProps = (state: any) => ({
    rtyDialPersonsByFirstCharResult: state.boruReducer.rtyDialPersonsByFirstCharResult,
    rtyDialRecordLoading: state.boruReducer.rtyDialRecordLoading,
    rtyDialRecordResult: state.boruReducer.rtyDialRecordResult,
    rtyDialRecordTotal: state.boruReducer.rtyDialRecordTotal,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDialPersonByFirstChar: bindActionCreators(getDialPersonByFirstChar, dispatch),
    getDialRecord: bindActionCreators(getDialRecord, dispatch),
})

const QueryRecordApp = connect(
    mapStateTopProps,
    mapDispatchToProps,
)(QuerRecordForm);

export default QueryRecordApp;

