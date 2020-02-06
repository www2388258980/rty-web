import api from '../../api/index';
import {rtyDialPerson} from "./data";

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