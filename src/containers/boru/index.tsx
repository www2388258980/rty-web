import React from 'react';

export interface BoruProps {

}

export interface BoruStates {

}

class Boru extends React.Component<BoruProps,BoruStates> {
    render() {
        return (
            <div className="boru" >
                {this.props.children}
            </div>
        );
    }
}

export default Boru;
