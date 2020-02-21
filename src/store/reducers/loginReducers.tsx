import baseReducer from '../base-reducer';

const namespace = 'login';

export default function LoginReducer(state = {isLogin: false}, action: any) {
    if (!action.isSpecial) {
        return baseReducer(namespace, state, action);
    } else {
        switch (action.type) {
            case namespace + '_login_PENDING':
                return Object.assign({}, state, {
                    loginLoading: true,
                });
            case namespace + '_login_SUCCESS':
                return Object.assign({}, state, {
                    loginResult: action.payload[action.resultType],
                    loginLoading: false,
                    status: action.payload['status'],
                    isLogin: true,
                });
            default:
                return {...state};
        }
    }
}
