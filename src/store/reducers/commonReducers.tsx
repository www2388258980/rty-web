import baseReducer from '../base-reducer';

const namespace = 'others';

export default function CommonReducer(state = {}, action: any) {
    if (!action.isSpecial) {
        return baseReducer(namespace, state, action);
    } else {
        switch (action.type) {
            default:
                return {...state};
        }
    }
}
