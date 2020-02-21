import React from 'react';

import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import {Form, Input, Modal, Row, Col, Select, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {StatusConstants, RtyConstants} from "../../constants/commonConstants";
import {rtyDialOAPerson, rtyDialOAPersonExtend} from "./data";
import {updateRtyOADialPersons} from './action';
import {getAllDepartment} from "../action";


const FormItem = Form.Item;
const {confirm} = Modal;
const {Option} = Select;

export interface editorOAProps extends FormComponentProps {
    visible: boolean;
    rtyOADialPerson: rtyDialOAPersonExtend;
    setVisible: any;
    handleTableChange: any;
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    updateRtyOADialPersons: any;
    updateRtyOADialPersonsLoading: boolean;
}

export interface editorOAStates {

}

class EditorOA extends React.Component<editorOAProps, editorOAStates> {
    state = {}

    componentDidMount(): void {
        const {rtyOADialPerson, form, getAllDepartment} = this.props;
        getAllDepartment();
        const {setFieldsValue} = form;
        setFieldsValue({
            firstName: rtyOADialPerson.firstName,
            telecomNumber: rtyOADialPerson.telecomNumber,
            countName: rtyOADialPerson.countName,
            status: rtyOADialPerson.status,
            rtyOAType: rtyOADialPerson.vpnTypeId,
            department: rtyOADialPerson.departmentId,
            billID: rtyOADialPerson.billId,
            description: rtyOADialPerson.description,
        });
    }

    componentDidUpdate(prevProps: Readonly<editorOAProps>, prevState: Readonly<editorOAStates>, snapshot?: any): void {
        const {updateRtyOADialPersonsLoading} = prevProps;
        if (updateRtyOADialPersonsLoading && updateRtyOADialPersonsLoading != this.props.updateRtyOADialPersonsLoading) {
            const {setVisible, handleTableChange} = this.props;
            handleTableChange();
            setVisible(false);
            message.success("修改成功.");
        }
    }

    handleOk = () => {
        const that = this;
        confirm({
            content: <div>确定修改吗?</div>,
            onOk() {
                const {form, rtyOADialPerson, updateRtyOADialPersons} = that.props;
                form.validateFields(err => {
                    if (err) {
                    } else {
                        const {getFieldsValue} = form;
                        const formData = getFieldsValue();
                        const rtyOADilaPersonu: rtyDialOAPerson = {
                            dialPersonId: rtyOADialPerson.dialPersonId,
                            firstName: formData.firstName,
                            telecomNumber: formData.telecomNumber,
                            countName: formData.countName,
                            status: formData.status,
                            vpnTypeId: formData.rtyOAType,
                            departmentId: formData.department,
                            description: formData.description,
                            modifiedBillId: formData.modifiedBillId,
                            modifiedBy: 'root',
                        };
                        updateRtyOADialPersons(rtyOADilaPersonu);
                    }
                })
            },
            onCancel() {
            },
        })

    }

    handleCancel = () => {
        this.props.setVisible(false);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string |
        number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {visible, form, departmentResult} = this.props;
        const {getFieldDecorator} = form;
        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];
        return (
            <Modal className="编辑"
                   visible={visible}
                   centered={true}
                   width={900}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem label="姓名">
                                {getFieldDecorator('firstName', {rules: [{required: true, message: "输入姓名"}]})(
                                    <Input placeholder="姓名"
                                           style={{width: '40%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="手机号码">
                                {getFieldDecorator('telecomNumber', {rules: [{required: true, message: "请输入手机号码"}]})(
                                    <Input placeholder="手机号码"
                                           style={{width: '60%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="rtyOA账号">
                                {getFieldDecorator('countName', {rules: [{required: true, message: "请输入rtyOA账号"}]})(
                                    <Input placeholder="rtyOA账号"
                                           style={{width: '80%'}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="是否可用">
                                {getFieldDecorator('status', {})(
                                    <Select placeholder="状态"
                                            style={{width: '30%'}}>
                                        <Option value={StatusConstants.STATUS_Y}>是</Option>
                                        <Option value={StatusConstants.STATUS_N}>否</Option>
                                    </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="rtyOA账号类型">
                                {getFieldDecorator('rtyOAType', {})(
                                    <Select placeholder="请选择vpn账号类型"
                                            style={{width: '80%', height: 30}}>
                                        <Option value={RtyConstants.VPN_TYPE_00}>公网-BOSS接入层</Option>
                                        <Option value={RtyConstants.VPN_TYPE_01}>公网-BOSS访问层</Option>
                                        <Option value={RtyConstants.VPN_TYPE_02}>OA-BOSS接入层</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={8}>
                            <FormItem label="所属部门">
                                {getFieldDecorator('department', {})(
                                    <Select placeholder="所属部门"
                                            style={{width: '80%'}}>
                                        {departmentOptions}
                                    </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="工单号">
                                {getFieldDecorator('billID', {})(
                                    <Input placeholder="工单号"
                                           disabled={true}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label="说明">
                                {getFieldDecorator('description', {rules: [{required: true, message: '请填写说明'}]})(
                                    <Input placeholder="说明"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label="修改工单号">
                                {getFieldDecorator('modifiedBillId', {rules: [{required: true}]})(
                                    <Input placeholder="修改工单号"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

const EditorOAForm = Form.create({name: 'editorOA'})(EditorOA);

const mapStateToProps = (state: any) => ({
    departmentResult: state.commonReducer.departmentResult,
    updateRtyOADialPersonsLoading: state.shenjiReducer.updateRtyOADialPersonsLoading,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    updateRtyOADialPersons: bindActionCreators(updateRtyOADialPersons, dispatch),
})


const EditorOAFormApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorOAForm)

export default EditorOAFormApp;

