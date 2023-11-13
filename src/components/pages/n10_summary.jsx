import React from "react";
import cookie from "react-cookies";

const SummaryPage = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? "block" : "none" };

  const { productsSelected, subcriteriaSelected, ratings } = props;

  const data = {
    productsSelected: Array.from(productsSelected),
    subcriteriaSelected: Array.from(subcriteriaSelected),
    ratings,
  };

  const csrftoken = cookie.load("csrftoken");
  console.log("cookie1: " + cookie.load("csrftoken"));
  
  return (
    <div className="summary-page" style={style}>
      <h2>Summary</h2>
      <p>
        <strong>productsSelected:</strong>
        {productsSelected && Array.from(productsSelected).join(", ")}
      </p>
      <p>
        <strong>subcriteriaSelected:</strong>
        {subcriteriaSelected && Array.from(subcriteriaSelected).join(", ")}
      </p>
      <p>
        <strong>ratings:</strong>
        {ratings &&
          Object.keys(ratings)
            .map((key) => `(${key}, ${ratings[key]})`)
            .join(", ")}
      </p>

      <form action="http://127.0.0.1:8000/todo/submit/" method="post">
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        <input
          type="text"
          id="ujson"
          name="ujson"
          value={JSON.stringify(data)}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
