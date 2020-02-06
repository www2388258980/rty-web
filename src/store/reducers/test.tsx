import baseReducer from '../base-reducer';

const namespace = 'test';

// 处理并返回 state
export default function CounterReducer(state = {count: 0}, action: { type: string, isSpecial?: boolean }) {
    if (!action.isSpecial) {
        return baseReducer(namespace, state, action);
    }
    switch (action.type) {
        case namespace + '_INCREMENT':
            console.log('INCREMENT');
            return Object.assign({}, state, {
                count: state.count + 1  //计数器加一
            });
        case namespace + '_DECREMENT':
            console.log('DECREMENT');
            return Object.assign({}, state, {
                count: state.count - 1  //计数器减一
            });
        default:
            return state;
    }
}
