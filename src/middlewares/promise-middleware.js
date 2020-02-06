import {isPromise} from '../utils/promise';

const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

export default function promiseMiddleware(config = {}) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

    return (_ref) => {
        const dispatch = _ref.dispatch;

        return next => action => {
            if(!isPromise(action.payload)){
                let originType = action.originType?action.originType:action.type;
                let type = action.originType?action.type:action.namespace?`${action.namespace}_${action.type}`:`${action.type}`;
                return next({
                    ...action,
                    originType,
                    type
                });
            }

            const {type, payload, meta,isSpecial, resultType,namespace} = action;
            const {promise, data} = payload;
            const [ PENDING, FULFILLED, REJECTED ] = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

            /**
             * Dispatch the first async handler. This tells the
             * reducers that an async action has been dispatched.
             */
            next({
                originType:type,
                type: namespace?`${namespace}_${type}_${PENDING}`:`${type}_${PENDING}`,
                ...!!data ? {payload: data} : {},
                ...!!meta ? {meta} : {},
                isSpecial,
                resultType,
                namespace
            });

            const isAction = resolved => resolved && (resolved.meta || resolved.payload);
            const isThunk = resolved => typeof resolved === 'function';
            const getResolveAction = isError => ({
                originType:type,
                type: namespace?`${namespace}_${type}_${isError ? REJECTED : FULFILLED}`:`${type}_${isError ? REJECTED : FULFILLED}`,
                ...!!meta ? {meta} : {},
                ...!!isError ? {error: true} : {},
                isSpecial,
                resultType,
                namespace
            });


            /**
             * Re-dispatch one of:
             *  1. a thunk, bound to a resolved/rejected object containing ?meta and type
             *  2. the resolved/rejected object, if it looks like an action, merged into action
             *  3. a resolve/rejected action with the resolve/rejected object as a payload
             */
            action.payload.promise = promise.then(
                (resolved = {}) => {
                    const resolveAction = getResolveAction();
                    return dispatch(isThunk(resolved) ? resolved.bind(null, resolveAction) : {
                        ...resolveAction,
                        ...isAction(resolved) ? resolved : {
                            ...!!resolved && {payload: resolved}
                        }
                    });
                },
                (rejected = {}) => {
                    const resolveAction = getResolveAction(true);
                    return dispatch(isThunk(rejected) ? rejected.bind(null, resolveAction) : {
                        ...resolveAction,
                        ...isAction(rejected) ? rejected : {
                            ...!!rejected && {payload: rejected}
                        }
                    });
                },
            );

            return action;
        };
    };
}
