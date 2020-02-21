/*
 * 定义/vpnDialOAPersons下所有接口数据类型
 */

// 定义该pojo类的数据类型
import {department, rtyOAType, user} from "../data";

export interface rtyDialOAPerson {
    dialPersonId?: number;
    firstName?: string;
    telecomNumber?: string;
    countName?: string;
    status?: string;
    description?: string;
    firstChar?: string;
    departmentId?: number;
    createdBy?: string;
    modifiedBy?: string;
    billId?: string;
    modifiedBillId?: string;
    vpnTypeId?: string;
    opType?: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
}

export interface rtyDialOAPersonHis {
    historyId?: number;
    dialPersonId?: number;
    oldFirstName?: string;
    oldTelecomNumber?: string;
    oldCountName?: string;
    oldStatus?: string;
    oldDescription?: string;
    oldFirstChar?: string;
    oldDepartmentId?: string;
    oldCreatedBy?: string;
    oldModifiedBy?: string;
    oldBillId?: string;
    oldModifiedBillId?: string;
    oldVpnTypeId?: string;
    firstName?: string;
    telecomNumber?: string;
    countName?: string;
    status?: string;
    description?: string;
    firstChar?: string;
    departmentId?: number;
    createdBy?: string;
    modifiedBy?: string;
    billId?: string;
    modifiedBillId?: string;
    vpnTypeId?: string;
    opType?: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
}

export interface rtyDialOAPersonExtend extends rtyDialOAPerson {
    department?: department;
    createdByUser?: user;
    modifiedByUser?: user;
    vpnType?: rtyOAType;
}

export interface rtyDialOAPersonHisExtend extends rtyDialOAPersonHis {
    department?: department;
    createdByUser?: user;
    modifiedByUser?: user;
    vpnType?: rtyOAType;
}


export interface rtyDialOAPersonReq extends rtyDialOAPerson {
    size: number | undefined;
    pageSize: number | undefined;
}

export interface rtyDialOAPersonHisReq extends rtyDialOAPersonHis {
    size: number;
    pageSize: number;
}