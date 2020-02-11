import api from '../../api/index';
import {rtyDialPerson, rtyDialPersonReq} from "./data";

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


export function getDialPerson(rtyDialPerson: rtyDialPersonReq) {
    let path = '/rtyDialPersons/getRtyDialPersons';
    return {
        type: 'dataSource',
        payload: {
            promise: api.request(path, 'post', rtyDialPerson)
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }

}