import React, {FormEvent} from 'react';

import {connect} from 'react-redux';

import {Form, Select, Row, Col, Button, Table} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {bindActionCreators, Dispatch} from "redux";
import {rtyDialPerson, rtyDialPersonExtend, rtyDialPersonReq} from "./data";
import {getDialPerson, getDialPersonByFirstChar} from "./action";
import {getAllDepartment} from "../action";
import {PaginationConfig} from "antd/lib/pagination";
import EditorFormApp from "./editor-inst";

const FormItem = Form.Item;
const {Option} = Select;

export interface queryPersonsProps extends FormComponentProps {
    getDialPersonByFirstChar: any;
    rtyDialPersonsByFirstCharResult: Array<rtyDialPerson>;
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    getDialPerson: any;
    dataSourceResult: Array<rtyDialPersonExtend>;
    dataSourceLoading: boolean;
    total: number;
}

export interface queryPersonsStates {
    columns: any;
    pagination: PaginationConfig;
    exeSql: boolean;
    rtyDialPerson: rtyDialPersonExtend; // 记录查询条件
    visible: boolean;
    rtyDialPersonnu: rtyDialPersonExtend; // 记录编辑
}

class QueryPerson extends React.Component<queryPersonsProps, queryPersonsStates> {
    state = {
        columns: [
            {
                title: '状态',
                dataIndex: 'status',
                fixed: 'left' as 'left',
                width: 80,
            },
            {
                title: '名字',
                dataIndex: 'firstName',
                fixed: 'left' as 'left',
                width: 120,
            },
            {
                title: '电话号码',
                dataIndex: 'telecomNumber',
                fixed: 'left' as 'left',
                width: 150,
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
                title: '最后启用的工单',
                dataIndex: 'modifiedBillId',
                width: 150,
            },
            {
                title: '最后启用人',
                dataIndex: 'modifiedUser.name',
                width: 120,
            },
            {
                title: '最后启用时间',
                dataIndex: 'lastUpdatedStamp',
                width: 200,
            },
            {

                title: 'Action',
                key: 'editor',
                fixed: 'right' as 'right',
                width: 80,
                render: (text: rtyDialPersonExtend) => {
                    return (<div className="action" onClick={this.editor.bind(this, text)}>编辑</div>);
                },
            }
        ],
        pagination: {
            pageSize: 5,
        },
        exeSql: false,
        rtyDialPerson: {},
        visible: false,
        rtyDialPersonnu: {},
    }

    componentDidMount(): void {
        const {getDialPersonByFirstChar, getAllDepartment} = this.props;
        getAllDepartment();
        getDialPersonByFirstChar();
    }

    componentDidUpdate(prevProps: Readonly<queryPersonsProps>, prevState: Readonly<queryPersonsStates>, snapshot?: any): void {
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

    handleSearch = (value: string) => {
        if (value) {
            const {getDialPersonByFirstChar} = this.props;
            getDialPersonByFirstChar(value);
        }
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = this.props.form;
        form.validateFields(err => {
            if (err) {
            } else {
                const {getFieldsValue} = form;
                const formData = getFieldsValue();
                const rtyDialPersonReq: rtyDialPersonReq = {
                    firstName: formData.firstName,
                    departmentId: formData.department,
                    size: 1,
                    pageSize: 5,
                }
                this.setState({
                    rtyDialPerson: {
                        firstName: formData.firstName,
                        departmentId: formData.department,
                    }
                });
                const {getDialPerson} = this.props;
                getDialPerson(rtyDialPersonReq);
                this.setState({
                    exeSql: true
                })
            }
        })

    }

    goBack = () => {
        this.setState({
            exeSql: false
        })
    }

    editor(rtyDialPerson: rtyDialPersonExtend) {
        this.setState({
            visible: true,
            rtyDialPersonnu: rtyDialPerson,
        })
    }

    setVisible = (visible: boolean) => {
        this.setState({
            visible,
        })
    }


    handleChange = (pagination: PaginationConfig = {current: 1, pageSize: 5}) => {
        const pager: PaginationConfig = {...this.state.pagination};
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        const {rtyDialPerson} = this.state;
        const rtyDialPersonReq: rtyDialPersonReq = {
            //@ts-ignore
            firstName: rtyDialPerson.firstName,
            //@ts-ignore
            departmentId: rtyDialPerson.department && rtyDialPerson.department.id,
            size: Number(pagination.current),
            pageSize: Number(pagination.pageSize),
        }
        const {getDialPerson} = this.props;
        getDialPerson(rtyDialPersonReq);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {getFieldDecorator} = this.props.form;
        const {rtyDialPersonsByFirstCharResult, departmentResult, dataSourceResult, dataSourceLoading} = this.props;
        // 填充拨入人员
        const rtyDialPersons = rtyDialPersonsByFirstCharResult ?
            rtyDialPersonsByFirstCharResult.map((item: rtyDialPerson) =>
                <Option key={item.dialPersonId} value={item.firstName}>{item.firstName}</Option>,
            ) : [];

        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];

        return (
            <div>
                {this.state.exeSql == false ?
                    <div>
                        <div className="nav">查询条件</div>
                        <Form onSubmit={this.handleSubmit} style={{marginLeft: 20}}>
                            <Row>

                                <Col span={6}>
                                    <FormItem label="拨入人">
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
                                <Col span={8}>
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
                                <Col span={6} style={{paddingLeft: 10, paddingTop: 42}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{width: 100}}>
                                        搜索
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div> :
                    <div>
                        <div className="page-nick">
                            <div className="nav" onClick={this.goBack} style={{cursor: 'pointer'}}>返回</div>
                            <Table bordered
                                   columns={this.state.columns} dataSource={dataSourceResult}
                                   pagination={this.state.pagination} scroll={{x: 1500}} loading={dataSourceLoading}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                }
                {this.state.visible &&
                // @ts-ignore
                <EditorFormApp visible={this.state.visible}
                               setVisible={this.setVisible}
                               rtyDialPerson={this.state.rtyDialPersonnu}
                               handleTableChange={this.handleChange}/>}
            </div>
        );
    }
}

const QueryPersonForm = Form.create({name: 'QueryPerson'})(QueryPerson);

const mapStateToProps = (state: any) => ({
    rtyDialPersonsByFirstCharResult: state.boruReducer.rtyDialPersonsByFirstCharResult,
    departmentResult: state.commonReducer.departmentResult,
    dataSourceResult: state.boruReducer.dataSourceResult,
    dataSourceLoading: state.boruReducer.dataSourceLoading,
    total: state.boruReducer.total,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getDialPersonByFirstChar: bindActionCreators(getDialPersonByFirstChar, dispatch),
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    getDialPerson: bindActionCreators(getDialPerson, dispatch),
})

const QueryPersonApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(QueryPersonForm);

export default QueryPersonApp;