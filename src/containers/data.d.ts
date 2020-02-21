/*
 * 定义公共的接口
 */

export interface department {
    id: string;
    name: string;
}

export interface user {
    id: string;
    name: string;
}

export interface rtyOAType{
    enumId: string;
    enumTypeId: string;
    enumCode: string;
    sequenceId: string;
    description: string;
    lastUpdatedTxStamp: string;
    createdStamp: string;
    comments: string;
    enumCodeNumber: string;
}