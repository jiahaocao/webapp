import React from 'react';
import Stars from '../widgets/Stars';

class WelcomePage extends React.Component {
  render() {
    const { current, number } = this.props;
    const style = { display: current == number ? 'block' : 'none' };
    return (
      <div className="welcome-page" style={style}>
        <h2>Welcome</h2>
        <p>Welcome to this study!</p>
        <p>
          The goal of this study is to test the usability of a new tool designed to assist people in making purchase decisions.
          Please follow the instructions to complete an online task.
        </p>
      </div>
    );
  }
}

export default WelcomePage;

