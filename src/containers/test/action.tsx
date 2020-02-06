const namespace = 'test';

// 增加 state 次数的方法
export function increment() {
    console.log("export function increment");
    return {
        type: 'INCREMENT',
        isSpecial: true,
        namespace,
    }
}

// 减少 state 次数的方法
export const decrement = () => ({
    type: 'DECREMENT',
    isSpecial: true,
    namespace
})
