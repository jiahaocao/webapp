import React from "react";

const MultiChoice = (props) => {
  const { question, choices } = props;
  const { name, values, setter } = props;

  const questionContent = (
    <p>
      {question.split("<br />").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );

  const choicesContent = choices.map((choice, index) => {
    return (
      <div key={index} className="choices">
        <input
          type="radio"
          name={name}
          value={values === undefined ? index : values[index]}
          onChange={(e) => setter(e.target.value)}
        />
        <label>{choice}</label>
      </div>
    );
  });

  return (
    <div className="multi-choice">
      {questionContent}
      {choicesContent}
    </div>
  );
};

export default MultiChoice;
