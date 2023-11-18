import React from "react";

const WelcomePage = (props) => {
  const { current, number } = props;
  const display = { display: current == number ? "block" : "none" };

  return (
    <section className="welcome-page" style={display}>
      <h2>Welcome</h2>
      <p>Welcome to this study!</p>
      <p>
        The goal of this study is to test the usability of a new tool designed
        to assist people in making purchase decisions. Please follow the
        instructions to complete an online task.
      </p>
    </section>
  );
};

export default WelcomePage;
