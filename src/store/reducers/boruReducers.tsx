import baseReducer from '../base-reducer';

const namespace = 'boru';

export default function BoruReducer(state = {}, action: any) {
    if (!action.isSpecial) {
        return baseReducer(namespace, state, action);
    } else {
        switch (action.type) {
            default:
                return {...state};
        }
    }
}
