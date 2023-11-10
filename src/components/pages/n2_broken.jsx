import React from 'react';

class BrokenPage extends React.Component {
    render() {
        const { current, number } = this.props;
        const style={display: current == number ? 'block' : 'none'};
        return (
            <div className="broken-page" style={style}>
            <h2>Senario</h2>
            <p>Image that your current cell phone is broken, and now you need to buy a new one.</p>
            </div>
        );
    }
}

export default BrokenPage;

