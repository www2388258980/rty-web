import baseReducer from '../base-reducer';

const namespace = 'shenji';

export default function ShenjiReducer(state = {}, action: any) {
    if (!action.isSpecial) {
        return baseReducer(namespace, state, action);
    } else {
        switch (action.type) {
            case namespace + '_dataSource_PENDING':
                return Object.assign({}, state, {
                    dataSourceLoading: true,
                });
            case namespace + '_dataSource_SUCCESS':
                return Object.assign({}, state, {
                    dataSourceResult: action.payload[action.resultType],
                    dataSourceLoading: false,
                    total: action.payload['total'],
                });
            case namespace + '_rtyOAPersonsHis_PENDING':
                return Object.assign({}, state, {
                    rtyOAPersonsHisLoading: true,
                });
            case namespace + '_rtyOAPersonsHis_SUCCESS':
                return Object.assign({}, state, {
                    rtyOAPersonsHisResult: action.payload[action.resultType],
                    rtyOAPersonsHisLoading: false,
                    rtyOAPersonsHisTotal: action.payload['total'],
                });
            default:
                return {...state};
        }
    }
}
