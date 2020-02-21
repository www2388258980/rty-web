import React from 'react';
import moment from 'moment';

import {Form, Row, Col, Modal, DatePicker, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import Input from "antd/lib/input";
import {bindActionCreators, Dispatch} from "redux";

import {connect} from "react-redux";
import Select from "antd/lib/select";
import {StatusConstants} from "../../constants/commonConstants";
import {rtyDialPerson, rtyDialPersonExtend} from "./data";
import {getAllDepartment} from "../action";
import {updateRtyDialPerson} from './action';


const FormItem = Form.Item;
const {Option} = Select;
const {confirm} = Modal;


export interface editorAppInstProps extends FormComponentProps {
    visible: boolean;
    setVisible: any;
    handleTableChange: any;
    rtyDialPerson: rtyDialPersonExtend;
    getAllDepartment: any;
    departmentResult: Array<{ id: number, name: string }>; // 部门
    updateRtyDialPerson: any;
    updateRtyDialPersonLoading: boolean;
}

export interface editorAppInstStates {

}

class Editor extends React.Component<editorAppInstProps, editorAppInstStates> {

    state = {}

    componentDidMount(): void {
        const {rtyDialPerson, form, getAllDepartment} = this.props;
        getAllDepartment();
        const {setFieldsValue} = form;
        setFieldsValue({
            firstName: rtyDialPerson.firstName,
            telecomNumber: rtyDialPerson.telecomNumber,
            department: rtyDialPerson.departmentId,
            effectiveDate: rtyDialPerson.effectiveDate ? moment(rtyDialPerson.effectiveDate, 'YYYY-MM-DD HH:mm:ss') : null,
            billID: rtyDialPerson.billId,
            status: rtyDialPerson.status,
            description: rtyDialPerson.description,
        });
    }

    componentDidUpdate(prevProps: Readonly<editorAppInstProps>, prevState: Readonly<editorAppInstStates>, snapshot?: any): void {
        const {updateRtyDialPersonLoading} = prevProps;
        if (updateRtyDialPersonLoading && updateRtyDialPersonLoading != this.props.updateRtyDialPersonLoading) {
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
                const {form, rtyDialPerson, updateRtyDialPerson} = that.props;
                form.validateFields(err => {
                    if (err) {
                    } else {
                        const {getFieldsValue} = form;
                        const formData = getFieldsValue();
                        const rtyDilaPersonu: rtyDialPerson = {
                            dialPersonId: rtyDialPerson.dialPersonId,
                            firstName: formData.firstName,
                            telecomNumber: formData.telecomNumber,
                            departmentId: formData.department,
                            effectiveDate: formData.effectiveDate,
                            status: formData.status,
                            description: formData.description,
                            modifiedBillId: formData.modifiedBillId,
                            opType: '修改',
                            modifiedBy: 'root',
                        };
                        updateRtyDialPerson(rtyDilaPersonu);
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

        const {visible, departmentResult} = this.props;
        const {getFieldDecorator} = this.props.form;

        const departmentOptions = departmentResult ? departmentResult.map((item: { id: number, name: string }) =>
            <Option value={item.id} key={item.id}>{item.name}</Option>) : [];

        return (
            <Modal className="编辑"
                   visible={visible}
                   centered={true}
                   width={800}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}>
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem label="姓名">
                                {getFieldDecorator('firstName', {rules: [{required: true, message: '请输入姓名'}]})(
                                    <Input placeholder="姓名"
                                           style={{width: '40%'}}/>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="手机号码">
                                {getFieldDecorator('telecomNumber', {
                                    rules: [{
                                        required: true,
                                        message: '请输入手机号码',
                                        pattern: /^1[3456789]\d{9}$/g
                                    }]
                                })(
                                    <Input placeholder="手机号码"
                                           style={{width: '60%'}}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="所属部门">
                                {getFieldDecorator('department', {})(
                                    <Select placeholder="所属部门"
                                            style={{width: '80%'}}>
                                        {departmentOptions}
                                    </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="有效期限">
                                {getFieldDecorator('effectiveDate', {})(
                                    <DatePicker placeholder="有效期限"
                                                style={{width: '80%'}}
                                                format="YYYY-MM-DD HH:mm:ss"/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="工单号">
                                {getFieldDecorator('billID', {})(
                                    <Input placeholder="工单号"
                                           style={{width: '80%'}}
                                           disabled={true}/>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="状态">
                                {getFieldDecorator('status', {})(
                                    <Select placeholder="是否可用"
                                            style={{width: '30%'}}>
                                        <Option value={StatusConstants.STATUS_Y}>是</Option>
                                        <Option value={StatusConstants.STATUS_N}>否</Option>
                                    </Select>)}
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

const EditorForm = Form.create({name: 'editor'})(Editor);

const mapStateToProps = (state: any) => ({
    departmentResult: state.commonReducer.departmentResult,
    updateRtyDialPersonLoading: state.boruReducer.updateRtyDialPersonLoading,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllDepartment: bindActionCreators(getAllDepartment, dispatch),
    updateRtyDialPerson: bindActionCreators(updateRtyDialPerson, dispatch),
})


const EditorFormApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorForm)

export default EditorFormApp;