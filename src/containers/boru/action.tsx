import api from '../../api/index';
import {rtyDialPerson, rtyDialPersonReq, rtyDialRecord, rtyDialRecordReq,rtyDialPersonHisReq} from "./data";

const namespace = 'boru';

export function insertPerson(rtyDialPerson: rtyDialPerson) {
    let path = '/rtyDialPersons/insert';
    return {
        type: 'insertPerson',
        payload: {
            promise: api.request(path, 'post', rtyDialPerson)
        },
        resultType: 'data',
        namespace
    }

}


export function getDialPerson(rtyDialPersonReq: rtyDialPersonReq) {
    let path = '/rtyDialPersons/getRtyDialPersons';
    return {
        type: 'dataSource',
        payload: {
            promise: api.request(path, 'post', rtyDialPersonReq)
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }

}

export function getDialPersonByFirstChar(firstChar?: string) {
    let path = '/rtyDialPersons/getRtyDialPersonsByFirstChar';
    return {
        type: 'rtyDialPersonsByFirstChar',
        payload: {
            promise: api.request(path, 'post', {firstChar})
        },
        resultType: 'data',
        namespace
    }

}

export function getRtyDialPersonsByKey(key: string) {
    let path = '/rtyDialPersons/getRtyDialPersonsByKey';
    return {
        type: 'rtyDialPersonsByKey',
        payload: {
            promise: api.request(path, 'post', {id: key})
        },
        resultType: 'data',
        namespace
    }

}

export function insertDialRecord(rtyDialRecord: rtyDialRecord) {
    let path = '/rtyDialRecord/insert';
    return {
        type: 'insertDialRecord',
        payload: {
            promise: api.request(path, 'post', rtyDialRecord)
        },
        resultType: 'data',
        namespace
    }

}

export function getDialRecord(rtyDialRecord: rtyDialRecordReq) {
    let path = '/rtyDialRecord/getRecords';
    return {
        type: 'rtyDialRecord',
        payload: {
            promise: api.request(path, 'post', rtyDialRecord)
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }

}

export function getDialPersonHis(rtyDialPersonHisReq: rtyDialPersonHisReq,startDate?: string,endDate?: string) {
    let path = '/rtyDialPersons/getRtyDialPersonsHis';
    return {
        type: 'rtyDialPersonsHisSource',
        payload: {
            promise: api.request(path, 'post', {...rtyDialPersonHisReq,startDate,endDate})
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }

}