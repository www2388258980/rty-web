import {LoginBean} from "./data";
import api from "../../api";

const namespace = 'login';

export function loginFunc(login: LoginBean) {
    let path = '/user/login';
    return {
        type: 'login',
        payload: {
            promise: api.request(path, 'post', {...login})
        },
        resultType: 'data',
        isSpecial: true,
        namespace
    }
}