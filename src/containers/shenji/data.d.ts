/*
 * 定义/vpnDialOAPersons下所有接口数据类型
 */

// 定义该pojo类的数据类型
export interface rtyDialOAPerson {
    dialPersonId?: number;
    firstName: string;
    telecomNumber: string;
    countName: string;
    status: string;
    description: string;
    firstChar?: string;
    departmentId: number;
    createdBy?: string;
    modifiedBy?: string;
    billId?: string;
    modifiedBillId?: string;
    vpnTypeId?: string;
    opType: string;
    lastUpdatedStamp?: string;
    createdStamp?: string;
}

export interface rtyObj {
    id: number;
    name: string;
}

// 定义getPersonsByCondition接口返回数据类型以及请求该接口数据类型
export interface rtyDialOAPersonRes extends rtyDialOAPerson{
    department: rtyObj;
    createdByUser: rtyObj;
    modifiedByUser: rtyObj;
    vpnType: { enumId: string; description: string }
}

export interface rtyDialOAPersonReq extends rtyDialOAPerson {
    size: number | undefined;
    pageSize: number | undefined;
}
