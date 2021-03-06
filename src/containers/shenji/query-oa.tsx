import React, {FormEvent} from 'react';

import {connect} from 'react-redux';

import {Form, Select, Row, Col, Button, Table} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {bindActionCreators, Dispatch} from "redux";
import {getAllDepartment} from "../action";
import {getRtyOADialPersonsByFirstChar, getPersonsByCondition} from './action';
import {rtyDialOAPerson, rtyDialOAPersonReq, rtyDialOAPersonExtend} from "./data";
import {PaginationConfig} from "antd/lib/pagination";
import EditorOAFormApp from "./eidtor-oa";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryOAProps extends FormComponentProps {
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    getRtyOADialPersonsByFirstChar: any;
    rtyOADialPersonsByFirstCharSourceResult: rtyDialOAPerson[];
    getPersonsByCondition: any;
    dataSourceResult: Array<rtyDialOAPersonExtend>;
    total: number;  // 数据长度
    dataSourceLoading: boolean;
}

export interface queryOAStates {
    columns: any;
    pagination: PaginationConfig;
    exeSql: boolean;
    rtyOADialPerson: rtyDialOAPersonExtend; // 记录查询条件
    visible: boolean;
    rtyOADialPersonnu: rtyDialOAPersonExtend; // 记录编辑
}

class QueryOA extends React.Component<queryOAProps, queryOAStates> {
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
                title: '最后启用的工单',
                dataIndex: 'modifiedBillId',
                width: 150
            },
            {
                title: '最后启用人',
                dataIndex: 'modifiedByUser.name',
                width: 120
            },
            {
                title: '最后启用时间',
                dataIndex: 'lastUpdatedStamp',
                width: 200
            },
            {
                title: 'Action',
                key: 'editor',
                width: 80,
                fixed: 'right' as 'right',
                render: (text: rtyDialOAPersonExtend) => {
                    return (<div className="action" onClick={this.editor.bind(this, text)}>编辑</div>);
                },
            },
        ],
        pagination: {
            pageSize: 10,
        },
        exeSql: false,
        rtyOADialPerson: {},
        visible: false,
        rtyOADialPersonnu: {},
    }

    componentDidMount(): void {
        const {getAllDepartment, getRtyOADialPersonsByFirstChar} = this.props;
        getAllDepartment();
        getRtyOADialPersonsByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<queryOAProps>, prevState: Readonly<queryOAStates>, snapshot?: any): void {
        const {dataSourceLoading} = prevProps;
        if (dataSourceLoading && dataSourceLoading != this.props.dataSourceLoading) {
            // 当获取数据成功以后设置total
            const pager: PaginationConfig = {...this.state.pagination};
            pager.total = this.props.total;
            this.setState({
                pagination: pager,
            })
        }
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {form, getPersonsByCondition} = this.props;
        form.validateFields(err => {
            if (err) {
            } else {
                const {getFieldsValue} = form;
                const formData = getFieldsValue();
                const rtyDialOAPersonReq: rtyDialOAPersonReq = {
                    firstName: formData.firstName,
                    departmentId: formData.department,
                    size: 1,
                    pageSize: 10,
                }
                getPersonsByCondition(rtyDialOAPersonReq);
                this.setState({
                    exeSql: true,
                    rtyOADialPerson: {
                        firstName: formData.firstName,
                        departmentId: formData.department,
                    }
                })
            }
        })
    }

    handleSearch = (value: string) => {
        const {getRtyOADialPersonsByFirstChar} = this.props;
        getRtyOADialPersonsByFirstChar(value);

    }

    goBack = () => {
        this.setState({
            exeSql: false
        })
    }

    handleTableChange = (pagination: PaginationConfig = {current: 1, pageSize: 10}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const {getPersonsByCondition} = this.props;
        const {rtyOADialPerson} = this.state;
        const data = {
            // @ts-ignore
            firstName: rtyOADialPerson.firstName,
            // @ts-ignore
            departmentId: rtyOADialPerson.department && rtyOADialPerson.department.id,
            size: pager.current,
            pageSize: pager.pageSize
        };
        getPersonsByCondition(data);
    }

    editor(rtyOADialPerson: rtyDialOAPersonExtend) {
        this.setState({
            visible: true,
            rtyOADialPersonnu: rtyOADialPerson,
        })
    }

    setVisible = (visible: boolean) => {
        this.setState({
            visible,
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        const {departmentResult, rtyOADialPersonsByFirstCharSourceResult, dataSourceResult, dataSourceLoading} = this.props;

        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];

        const rtyOADialPersons = rtyOADialPersonsByFirstCharSourceResult ?
            rtyOADialPersonsByFirstCharSourceResult.map((item: rtyDialOAPerson) =>
                <Option key={item.dialPersonId} value={item.firstName}>{item.firstName}</Option>,
            ) : [];

        return (
            <div className="query-oa">
                {this.state.exeSql == false ?
                    <div>
                        <div className="nav">查询条件</div>
                        <Form style={{marginLeft: 20}} onSubmit={this.handleSubmit}>
                            <Row>
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
                                    <FormItem label="选择部门">
                                        {getFieldDecorator("department", {})(
                                            <Select placeholder="选择部门"
                                                    style={{width: '80%'}}
                                                    showSearch>
                                                {departmentOptions}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} style={{paddingLeft: 20, paddingTop: 44}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{width: 80}}>
                                        搜索
                                    </Button>
                                </Col>
                            </Row>
                        </Form></div> :
                    <div>
                        <div className="nav" onClick={this.goBack} style={{cursor: 'pointer'}}>返回</div>
                        <Table bordered
                               columns={this.state.columns} dataSource={dataSourceResult} loading={dataSourceLoading}
                               pagination={this.state.pagination} scroll={{x: 1800}}
                               onChange={this.handleTableChange}/>

                    </div>
                }
                {this.state.visible &&
                // @ts-ignore
                <EditorOAFormApp visible={this.state.visible}
                                 setVisible={this.setVisible}
                                 rtyOADialPerson={this.state.rtyOADialPersonnu}
                                 handleTableChange={this.handleTableChange}/>}

            </div>
        );
    }
}

const QueryOAForm = Form.create({name: 'QueryOA'})(QueryOA);

const mapStatesToProps = (state: any) => ({
    departmentResult: state.commonReducer.departmentResult,
    rtyOADialPersonsByFirstCharSourceResult: state.shenjiReducer.rtyOADialPersonsByFirstCharSourceResult,
    dataSourceResult: state.shenjiReducer.dataSourceResult,
    dataSourceLoading: state.shenjiReducer.dataSourceLoading,
    total: state.shenjiReducer.total,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    getRtyOADialPersonsByFirstChar: bindActionCreators(getRtyOADialPersonsByFirstChar, dispatch),
    getPersonsByCondition: bindActionCreators(getPersonsByCondition, dispatch),
})

const QueryOAApp = connect(
    mapStatesToProps,
    mapDispatchToProps,
)(QueryOAForm);

export default QueryOAApp;

