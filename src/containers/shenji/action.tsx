import api from '../../api/index';

import {rtyDialOAPersonReq, rtyDialOAPerson} from './data'

const namespace = 'shenji';

export function getPersonsByCondition(data: rtyDialOAPersonReq) {
    let path = '/rtyDialOAPersons/getPersonsByCondition';
    return {
        type: 'dataSource',
        payload: {
            promise: api.request(path, 'post', data)
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