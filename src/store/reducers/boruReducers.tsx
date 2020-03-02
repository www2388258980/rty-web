import baseReducer from '../base-reducer';

const namespace = 'boru';

export default function BoruReducer(state = {}, action: any) {
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
            case namespace + '_rtyDialRecord_PENDING':
                return Object.assign({}, state, {
                    rtyDialRecordLoading: true,
                });
            case namespace + '_rtyDialRecord_SUCCESS':
                return Object.assign({}, state, {
                    rtyDialRecordResult: action.payload[action.resultType],
                    rtyDialRecordLoading: false,
                    rtyDialRecordTotal: action.payload['total'],
                });
            case namespace + '_rtyDialPersonsHisSource_PENDING':
                return Object.assign({}, state, {
                    rtyDialPersonsHisSourceLoading: true,
                });
            case namespace + '_rtyDialPersonsHisSource_SUCCESS':
                return Object.assign({}, state, {
                    rtyDialPersonsHisSourceResult: action.payload[action.resultType],
                    rtyDialPersonsHisSourceLoading: false,
                    rtyDialPersonsHisSourceTotal: action.payload['total'],
                });
            case namespace + '_deleteDialRecord_PENDING':
                return Object.assign({}, state, {
                    rtyDialRecordLoading: true,
                });
            case namespace + '_deleteDialRecord_SUCCESS':
                return Object.assign({}, state, {
                    rtyDialRecordLoading: false,
                });
            default:
                return {...state};
        }
    }
}
