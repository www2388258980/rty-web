import api from '../../api/index';

import {rtyDialOAPersonReq, rtyDialOAPerson} from './data'

const namespace = 'shenji';

export function getPersonsByCondition(data: rtyDialOAPersonReq, startDate?: string, endDate?: string) {
    let path = '/rtyOADialPersons/getPersonsByCondition';
    return {
        type: 'dataSource',
        payload: {
            promise: api.request(path, 'post', {...data, startDate, endDate})
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }
}

export function insertRtyDialOAPersons(data: rtyDialOAPerson) {
    let path = '/rtyDialOAPersons/insert';
    return {
        type: 'insert',
        payload: {
            promise: api.request(path, 'post', data)
        },
        resultType: 'data',
        namespace
    }
}

export function getRtyOADialPersonsByFirstChar(firstChar?: string) {
    let path = '/rtyOADialPersons/getRtyOADialPersonsByFirstChar';
    return {
        type: 'rtyOADialPersonsByFirstCharSource',
        payload: {
            promise: api.request(path, 'post', {firstChar})
        },
        resultType: 'data',
        namespace
    }
}