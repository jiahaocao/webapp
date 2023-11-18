import React from 'react';

class GoaltreePage extends React.Component {
    render() {
        const { current, number } = this.props;
        const style={display: current == number ? 'block' : 'none'};

        return (
            <section className="goaltree-page" style={style}>
            <h2>Visualization</h2>
            </section>
        );
    }
}

export default GoaltreePage;
