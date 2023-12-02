import React from "react";

const BrokenPage = (props) => {
  const { current, number } = props;
  const display = { display: current == number ? "block" : "none" };

  return (
    <section className="broken-page" style={display}>
      <h2>Senario</h2>
      <p>
        Image that your current cell phone is broken, and now you need to buy a
        new one.
      </p>
    </section>
  );
};

export default BrokenPage;
