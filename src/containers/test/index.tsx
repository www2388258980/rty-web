import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {decrement, increment} from '../test/action';

// 创建类型接口
export interface IProps {
    value: number;
    onIncrement: any;
    onDecrement: any;
}


// 使用接口代替 PropTypes 进行类型校验
class Counter extends React.PureComponent<IProps> {
    public render() {
        const {value, onIncrement, onDecrement} = this.props;
        console.log("value: " + value);
        console.log('onIncrement: ' + typeof onIncrement)
        return (
            <p>
                Clicked: {value} times
                <br/>
                <br/>
                <button onClick={onIncrement} style={{marginRight: 20}}> +</button>
                <button onClick={onDecrement}> -</button>
            </p>
        )
    }
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: { counterReducer: any }) => ({
    value: state.counterReducer.count
})

// 将对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) => ({
    onDecrement: bindActionCreators(decrement, dispatch),
    onIncrement: bindActionCreators(increment, dispatch),
})

// 使用 connect 高阶组件对 Counter 进行包裹
const CounterApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default CounterApp;

