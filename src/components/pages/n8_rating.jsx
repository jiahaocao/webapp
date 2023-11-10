import React from 'react';
import PageTurn from '../widgets/pageturn';

class RatingPage extends React.Component {
  render() {
    const { current, number } = this.props;
    const style={display: current == number ? 'block' : 'none'};
    return (
      <div className="rating-page" style={style}>
        <h2>Rating</h2>
      </div>
    );
  }
}

export default RatingPage;

