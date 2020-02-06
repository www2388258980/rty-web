import React from 'react';

export interface ShenjiProps {

}

export interface ShenjiStats {

}

class Shenji extends React.Component<ShenjiProps,ShenjiStats> {

    state = {};

    render() {
        return (
            <div className="shenji">
                {this.props.children}
            </div>
        );
    }
}

export default Shenji;
