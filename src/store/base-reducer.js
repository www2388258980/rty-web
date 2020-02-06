const initialState = {};

export default function baseReducer(base, state = initialState, action = {}) {
    switch (action.type) {
        case `${base}_${action.originType}_PENDING`:
            return {
                ...state,
                [`${action.originType}Result`]: state[`${action.originType}Result`] ? state[`${action.originType}Result`] : null,
                [`${action.originType}Loading`]: true,
                [`${action.originType}Meta`]: action.meta,
            };

        case `${base}_${action.originType}_SUCCESS`:
            return {
                ...state,
                [`${action.originType}Result`]: action.resultType ? action.payload[action.resultType] : action.payload,
                [`${action.originType}Loading`]: false,
                [`${action.originType}Meta`]: action.meta,
            };

        case `${base}_${action.originType}_ERROR`:
            return {
                ...state,
                [`${action.originType}Error`]: action.payload.errorMsg,
                [`${action.originType}Loading`]: false
            };

        case `${base}_${action.originType}`:
            return {...state, [action.originType]: action.data, [`${action.originType}Meta`]: action.meta};

        default:
            return {...state};
    }
}
