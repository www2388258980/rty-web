/*
 * 定义公共的action
 */

import api from '../api/index'

const namespace = 'others';

export function getAllDepartment() {
    let path = '/others/getDepartment';
    return {
        type: 'department',
        payload: {
            promise: api.request(path, 'post')
        },
        resultType: 'data',
        namespace
    }
}