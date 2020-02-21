/*
 * 定义rty_DialRecord pojo类
 */
import {department, user} from "../data";

export interface rtyDialRecord {
    vpnDialRecordId?: number;
    firstName?: string;
    vpnDialCause?: string;
    description?: string;
    dialDate?: string;
    createdDate?: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
    createdByUserLogin?: string;
    telecomNumber?: string;
    departmentId?: number;
}

export interface rtyDialPerson {
    dialPersonId?: number;
    firstName?: string;
    telecomNumber?: string;
    description?: string;
    firstChar?: string;
    departmentId?: number;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    billId?: string;
    modifiedBillId?: string;
    opType?: string;
    effectiveDate?: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
}

export interface rtyDialPersonHis {
    historyId?: number;
    dialPersonId?: number;
    oldFirstName?: string;
    oldTelecomNumber?: string;
    oldStatus?: string;
    oldDescription?: string;
    oldFirstChar?: string;
    oldDepartmentId?: string;
    oldDepartmentId?: string;
    oldCreatedBy?: string;
    oldModifiedBy?: string;
    oldbillId?: string;
    oldModifiedBillId?: string;
    firstName?: string;
    telecomNumber?: string;
    description?: string;
    firstChar?: string;
    departmentId?: string;
    status?: string;
    createdBy?: string;
    modifiedBy?: string;
    billId?: string;
    modifiedBillId?: string;
    opType?: string;
    effectiveDate?: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
}

export interface rtyDialPersonExtend extends rtyDialPerson {
    department?: department;
    createdUser?: user;
    modifiedUser?: user;
}

export interface rtyDialPersonHisExtend extends rtyDialPersonHis {
    department?: department;
    createdUser?: user;
    modifiedUser?: user;
}

export interface rtyDialPersonReq extends rtyDialPerson {
    size: number;
    pageSize: number;
}

export interface rtyDialRecordReq extends rtyDialRecord {
    size: number;
    pageSize: number;
}

export interface rtyDialPersonHisReq extends rtyDialPersonHis {
    size: number;
    pageSize: number;
}